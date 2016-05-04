/**
 * Angular filter for amdDatatable directive to apply column filters to data.
 */
function rowFilter () {
    return (rows, filters) => {
        // If there are no active filter, do nothing.
        if (!filters) {
            return rows;
        }

        let filterIsActive;
        angular.forEach(filters, (set) => {
            if (!filterIsActive) {
                filterIsActive = set.size > 0;
            }
        });

        if (!filterIsActive) {
            return rows;
        }

        // Apply active filters.
        let filteredResults = [];

        angular.forEach(rows, (row) => {
            let qualified = false;
            // Check every filterable column for filters.
            angular.forEach(filters, (filterSet, colIndex) => {
                if (!qualified) {
                    // Check the row data against all active filters.
                    angular.forEach(filterSet, (filter) => {
                        if (row[colIndex] === filter) {
                            filteredResults.push(row);
                            qualified = true;
                        }
                    });
                }
            });
        });

        return filteredResults;
    };
}

export default rowFilter;
