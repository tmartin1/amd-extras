/**
 * Controller for amdDatatable directive.
 * Please read the README.md and example.js documents in this directory before making any changes to
 * this file or the amdDatatable.directive.js file.
 *
 * ***** See the README.md for detailed information about this directive *****
 */

let _$filter = new WeakMap();
let _$q = new WeakMap();

class DatatableController {
    constructor ($filter, $q) {
        _$filter = $filter;
        _$q = $q;

        let buildDatatable = (tabledata) => {
            this.tableData = tabledata.slice();
            this.activeFilters = {};
            this.filtered = {};
            this.rowMenu = {
                show: 'none'
            };

            this._buildColumns();
            this._buildTable();
            this._buildPagination();
            this._buildCustomActions();

            this.selectedRows = this.options.row.select;
        };

        if (angular.isArray(this.tabledata)) {
            // Data is not a promise.
            buildDatatable(this.tabledata);
        } else {
            // Data is a promise.
            this.pending = true;
            $q.when(this.tabledata)
                .then((tabledata) => {
                    this.pending = false;
                    buildDatatable(tabledata);
                })
                .catch((err) => {
                    this.pending = false;
                    console.log(err);
                });
        }
    }

    _buildColumns () {
        angular.forEach(this.columns, (column, index) => {
            column.align = column.align || 'left';
            column.sortable = angular.isUndefined(column.sortable) ? true : false;
            if (column.filters) {
                this.activeFilters[index] = new Set();
            }
        });

        // Define default filters if undefined.
        let buildColumnFilter = {};
        angular.forEach(this.columns, (column, index) => {
            if (angular.isArray(column.filters)) {
                column.filters = column.filters.map((filter) => {
                    return angular.isString(filter) ? { name: filter } : filter;
                });
            } else if (column.filters === true) {
                buildColumnFilter[index] = new Set();
            }
        });
        if (Object.keys(buildColumnFilter)) {
            angular.forEach(this.tableData, (row) => {
                angular.forEach(buildColumnFilter, (set, colIndex) => {
                    set.add(row[colIndex]);
                });
            });
            angular.forEach(buildColumnFilter, (filterSet, index) => {
                this.columns[index].filters = [];
                filterSet.forEach((filter) => this.columns[index].filters.push({ name: filter }));
                this.columns[index].filters.sort();
            });
        }
    }

    /**
     * Define initial amdDatatable options variables.
     */
    _buildTable () {
        let options = this.options;
        options.searchable = ensureValue(options.searchable, true);
        options.row = ensureValue(options.row, {});
        options.selectable = ensureValue(options.selectable, Boolean(options.row.select));
        options.row.select = ensureValue(options.row.select || new Set());
    }

    /**
     * Define initial pagination variables.
     */
    _buildPagination () {
        // If scroll options are defined and pagination otpions are not, don't set defaults.
        // TODO: Uncomment the following three lines once scroll functionality is implemented.
        // if (this.options.scroll && !this.options.pagination) {
        //     return;
        // }

        this.options.pagination = ensureValue(this.options.pagination, {});
        let pagination = this.pagination = this.options.pagination;

        // Merge default values with values provided. Provided values override defaults.
        let paginationSettings = angular.extend({
            rowsPerPage: 10,
            rowsPerPageOptions: [10, 25, 50, 100],
            current: 1,
            maxButtons: 5,
            totalResults: this.tableData.length,
        }, pagination);

        angular.extend(pagination, paginationSettings);

        // Return the index of the first row displayed + 1.
        pagination.start = () => {
            return ((pagination.current - 1) * pagination.rowsPerPage) + 1;
        };

        // Return the index of the last row displayed + 1.
        pagination.end = () => {
            return Math.min(pagination.totalResults, pagination.current * pagination.rowsPerPage);
        };

        // If the provided rowsPerPage setting is not included in the rpp options. Add it.
        if (pagination.rowsPerPageOptions.indexOf(pagination.rowsPerPage) < 0) {
            pagination.rowsPerPageOptions.push(pagination.rowsPerPage);
            pagination.rowsPerPageOptions.sort((a, b) => a > b ? 1 : -1);
        }

        this._updatePaginationBar();
    }

    /**
     * Redefine default actions where appropriate based on given override, before, and after params.
     */
    _buildCustomActions () {
        let options = this.options;
        if (!options) {
            return;
        }

        // Check for and handle all action overrides.
        if (options.override) {
            angular.forEach(options.override, (newAction, name) => this[name] = newAction);
        }

        /**
         * Prepend or append a custom function to one of the table actions.
         * @param {Boolean} prepend - If true, custom function is invoked before the default. If
         *                          false, the custom function is invoked after the default.
         * @param {Function} fn - Custom function to invoke before/after the default function.
         * @param {String} name - Name of the action to be modified.
         */
        let modifyAction = (prepend, fn, name) => {
            let overridden = options.override && options.override[name];
            // If the action is the default action (not overridden), bind function to this.
            let action = overridden ? this[name] : this[name].bind(this);
            let args = new Array(action.length); // jshint ignore:line
            let fnOrder = prepend ? [fn, action] : [action, fn];
            this[name] = (...args) => _$q.when(fnOrder[0](...args), fnOrder[1](...args));
        };

        // Check for and handle all custom actions to be executed before the default action.
        // Custom function can return a value or a promise.
        if (options.before) {
            angular.forEach(options.before, (fn, name) => modifyAction(true, fn, name));
        }

        // Check for and handle all custom actions to be executed after the default action.
        // Default function can return a value or a promise.
        if (options.after) {
            angular.forEach(options.after, (fn, name) => modifyAction(false, fn, name));
        }
    }

    /**
     * Build and update the pagination bar.
     * @param {Boolean} reset - Trigger reset to first page.
     */
    _updatePaginationBar (reset) {
        if (reset) {
            this.pagination.current = 1;
        }

        let pagination = this.options.pagination;
        let trail = Math.floor(pagination.maxButtons / 2);
        let buttonCount = pagination.maxButtons;

        pagination.pageCount = Math.ceil(pagination.totalResults / pagination.rowsPerPage);
        if (pagination.pageCount < pagination.maxButtons) {
            buttonCount = pagination.pageCount;
        }

        let start = Math.max(1, pagination.current - trail);
        if (pagination.current + trail > pagination.pageCount) {
            start = pagination.pageCount + 1 - buttonCount;
        }

        pagination.pageButtons = [];
        for (let i = 0; i < buttonCount; i++) {
            pagination.pageButtons.push(start + i);
        }
    }

    /**
     * Update displayed data after processing search and column filters.
     */
    _updateTableData (resetPagination) {
        _$q.when(this.tabledata, (tabledata) => {
            this.tableData = tabledata.slice();

            if (this.searchFilter) {
                this.tableData = _$filter('filter')(this.tableData, this.searchInput);
            }

            if (this.anyFilterSelected()) {
                this.tableData = _$filter('rowFilter')(this.tableData, this.rowFilters);
            }

            this._updatePaginationBar(resetPagination);
        });
    }

    /**
     * Render the contents of a given cell according to the column options.
     * @param  {Object} row - Row data to be displayed.
     * @param  {String} key - Key or index to the corresponding column options object.
     * @param  {Object} column - Column options object.
     * @return {Object} the rendered cell.
     */
    renderCell (row, key, column) {
        let cell;

        // Handle any nested objects as necessary.
        if (key.split) {
            cell = row;
            let path = key.split('.');
            for (const step of path) {
                if (angular.isUndefined(cell)) {
                    return undefined;
                }
                cell = cell[step];
            }
        } else {
            cell = row[key];
        }

        // Apply custom formatting (cellCallback) and display filters.
        if (column) {
            if (column.cellCallback) {
                cell = column.cellCallback(cell);
            }
            if (column.displayFilter) {
                let filterOptions = column.displayFilter.options || [];
                cell = _$filter(column.displayFilter.name)(cell, ...filterOptions);
            }
        }

        return cell;
    }

    // // // // // SEARCH METHODS // // // // //

    /**
     * Search results.
     */
    search (searchInput) {
        console.log(`Default search action for: ${searchInput}`);
        this.searchFilter = searchInput;
        this._updateTableData(true);
    }

    clearSearch () {
        this.searchInput = '';
        if (this.searchFilter) {
            this.search();
        }
    }

    // // // // // SORTING METHODS // // // // //

    /**
     * Sort results. Sort alphabetically by column index clicked. If values are the same, subsort
     * by the first visible column.
     * @param {Object} column - Column object of the column to be sorted.
     * @param {Number} index - Index of the column to be sorted.
     */
    sort (column, index) {
        let firstVisible = this.columns.findIndex((col, i) => {
            return !col.hidden && i !== index;
        });

        if (!this.firstSortCol || (this.firstSortCol === index && !this.secondSortCol)) {
            this.secondSortCol = firstVisible;
        } else {
            this.secondSortCol = this.firstSortCol;
        }

        this.reverseSort = this.reverseSort ? false : column.sorted;
        column.sorted = this.reverseSort ? true : !column.sorted;
        this.firstSortCol = index;
        this.currentSortColumnIndex = index;
    }

    // // // // // FILTER METHODS // // // // //

    /**
     * Apply a filter(s), requery db for new results, display new results.
     * @param {Object[]} filters - Array of filter objects.
     */
    filter (filters) {
        console.log('apply filter');
        console.log(filters);
        this.rowFilters = {};
        angular.forEach(filters, (filter, index) => this.rowFilters[index] = new Set(filter));
        this._updateTableData(true);
    }

    /**
     * Toggle selection of a specifc filter.
     * @param {Object} filter - The filter object.
     * @param {Number} colIndex - Index of the column to be filtered.
     * @param {String} addOrDelete - 'add' or 'delete'. Forces the filter on or off respectively.
     */
    toggleFilter (filter, colIndex, addOrDelete) {
        let activeFilters = this.activeFilters[colIndex];
        let filterData = angular.isUndefined(filter.value) ? filter.name || filter : filter.value;
        addOrDelete = addOrDelete || activeFilters.has(filterData) ? 'delete' : 'add';

        activeFilters[addOrDelete](filterData);
    }

    /**
     * Select or unselect all filters for a column. Does not apply these filters.
     * If any filter is selected, unselect all filters. Otherwise, select all filters.
     * @param {Object[]} filters - Array of filter objects.
     * @param {Number} colIndex - Index of the column to be filtered.
     */
    toggleSelectAllFilters (filters, colIndex) {
        let flag = this.anyFilterSelected(filters) ? false : true;
        let addOrDelete = flag ? 'delete' : 'add';

        angular.forEach(filters, (filter) => {
            filter.selected = flag;
            this.toggleFilter(filter, colIndex, addOrDelete);
        });
    }

    /**
     * Remove all filters from all columns and refreshes search results.
     */
    clearAllFilters () {
        angular.forEach(this.columns, (column, index) => {
            if (column.filters) {
                this.activeFilters[index].clear();
                angular.forEach(column.filters, (filter) => filter.selected = false);
            }
        });
        // Refresh results with out filters.
        this.filter(null);
    }

    /**
     * Check if any filters are selected in a given set of filters. If no filter set is provided,
     * this will check if there are any active filters in any of the columns.
     * @param  {Object[]} [filters] - Array of filter objects.
     * @return {Boolean} true if one or more filters is selected, false otherwise.
     */
    anyFilterSelected (filters) {
        if (!filters) {
            let filterActive = false;

            angular.forEach(this.columns, (column) => {
                if (column.filters && column.filters.some &&
                    column.filters.some((filter) => filter.selected)) {
                    filterActive = true;
                }
            });

            return filterActive;
        }
        if (filters.some) {
            return filters.some((filter) => filter.selected);
        }
    }

    // // // // // ROW CLICK METHODS // // // // //

    /**
     * Triggered when a row in the amdDatatable is clicked. Not triggered for the title row.
     * @param {Object} event - Event object.
     * @param {Object} row - Row data object.
     * @param {Number} index - Index of the row.
     */
    rowClick (event, row, index) {
        if (this.options.selectable && event.target.tagName.toLowerCase() !== 'button') {
            let type = event.ctrlKey || event.metaKey ? 'multi' : event.shiftKey ? 'span' : null;
            this.toggleRowSelect(row, index, type);
        }
    }

    /**
     * Triggered when a row in the amdDatatable is double clicked. Not triggered for the title row.
     * @param {Object} event - Event object.
     * @param {Object} row - Row data object.
     * @param {Number} index - Index of the row.
     */
    rowDoubleClick (event, row, index) {
        // By default, this does the same thing as a single click.
        this.rowClick(event, row, index);
    }

    /**
     * Triggered when a row in the amdDatatable is right clicked. Not triggered for the title row.
     * @param {Object} event - Event object.
     * @param {Object} row - Row data object.
     * @param {Number} index - Index of the row.
     */
    rowRightClick (event, row, index) {
        // If row isn't selected, perform basic click function on the row as well.
        if (!this.selectedRows.has(row)) {
            this.rowClick({ target: { tagName: '' }}, row, index);
        }

        // If right-click menu is defined, open the menu.
        if (this.options.row.menu && event.target.tagName.toLowerCase() !== 'button') {
            console.log(`Right clicked row: ${row}`);

            this.rowMenu = {
                show: 'block',
                y: event.y + 'px',
                x: event.x + 'px',
                data: row,
                index: index
            };

            // Disable scrolling while menu is open.
            angular.element(document).find('body').css('overflow', 'hidden');
        }
    }

    dismissRightClickMenu () {
        this.rowMenu = {};
        // Reenable scrolling.
        angular.element(document).find('body').css('overflow', 'inherit');
    }

    /**
     * Select or unselect a row.
     * @param {Object} row - Row data object.
     * @param {Number} index - Index of the row.
     * @param {String} [type = 'single'] - 'single', 'multi', or 'span' to determine how rows will
     *                       				be selected.
     */
    toggleRowSelect (row, index, type) {
        let addOrDelete = this.selectedRows.has(row) ? 'delete' : 'add';

        // The multiselect option must be specifically disallowed to prevent it.
        if (this.options.row.multiSelect !== false) {
            // Control/Command Click: Add/remove target row from selectedRows set.
            if (type === 'multi') {
                this.selectedRows[addOrDelete](row);
                this.lastRowSelected = addOrDelete === 'add' ? index : null;
                return;
            }

            // Shift Click: Add target rows between the last selected row and the current row to
            // the selectedRows set.
            if (type === 'span') {
                document.getSelection().removeAllRanges(); // Remove text highlighting selection.
                if (this.lastRowSelected) {
                    let order = ([this.lastRowSelected, index]).sort();
                    for (let i = order[0]; i <= order[1]; i++) {
                        this.selectedRows.add(this.tableData[i]);
                    }
                } else {
                    this.selectedRows.add(row);
                }
                this.lastRowSelected = index;
                return;
            }
        }

        // Single Click: Add/remove target row from selectedRows set, remove all other rows.
        if (this.selectedRows.size > 1) {
            addOrDelete = 'add';
        }

        this.selectedRows.clear();
        this.selectedRows[addOrDelete](row);
        this.lastRowSelected = addOrDelete === 'add' ? index : null;
    }

    /**
     * Select all visible rows or unselect all rows.
     */
    toggleSelectAllRows () {
        if (this.options.row.selectAll) {
            if (this.selectedRows.size) {
                // If any row is selected, unselect all rows.
                this.selectedRows.clear();
            } else {
                // Otherwise, select all visible rows.
                let start = (this.pagination.current - 1) * this.pagination.rowsPerPage;
                let end = this.pagination.current * this.pagination.rowsPerPage;
                for (let i = start; i < end; i++) {
                    this.selectedRows.add(this.tableData[i]);
                }
            }
        }
    }

    // // // // // PAGINATION METHODS // // // // //

    /**
     * Navigate to a specific page of results.
     * @param {Number} page - Page number to naviate to.
     */
    goToPage (page) {
        this.pagination.current = page;
        this._updatePaginationBar();
    }

    /**
     * Go to the next page of results.
     */
    nextPage () {
        this.goToPage(this.pagination.current + 1);
    }

    /**
     * Go to the previous page of results.
     */
    previousPage () {
        this.goToPage(this.pagination.current - 1);
    }

    /**
     * Triggers when the results per page option is changed.
     * Updates pagination bar.
     * @param {Number} rpp - Number of results to show per page.
     */
    rowsPerPage (rpp) {
        this._updatePaginationBar(true);
        return rpp;
    }
}

/**
 * Check for given value and set a default value if initial value is not provided.
 * @param  {*} initialValue - Initial value to check.
 * @param  {*} defaultValue - Default value to use if initialValue is not defined.
 * @return {*} initialValue if defined, defaultValue if initialValue is not defined.
 */
function ensureValue (initialValue, defaultValue) {
    return angular.isUndefined(initialValue) ? defaultValue : initialValue;
}

export default DatatableController;
