/**
 * This is a supplement to the README.md for the amdDatatable directive to illustrate the structure
 * of the different column and table options as well as their default values and behaviors.
 */

dt.columns = [{
    title: 'Column Title', // String. Text for column title.
    hidden: false, // Boolean. Determines if column is displayed or not.
    align: 'left', // String. Text alignment of all cells in column: 'left', 'center', or 'right'.
    width: 'normal', // String. Relative width of column: 'tight', 'normal', 'wide'.
    popover: undefined, // Object or string for popover text. The both of following are valid:
    /* Example 1: popover as a string:
    popover: 'Text', // Default icon will be used for string values.
    */
    /* Example 2: popover as an object:
    popover: {
        text: 'Text', // Text to be displayed for the popover.
        type: 'warning' // Change the default info icon to one of the other options.
    },
    */
    sortable: true, // Can be true (simple orderBy) or false (no sorting).
    filters: false, // Can be true (options determined from data), false (no filter), or array of
    // strings to define filter options.
    cellClick: undefined, // Function called when a cell in this column is clicked. Function has
    // access to (event, rowData, rowIndex, colIndex).
    dataCallback: undefined, // Function called on each cell in this column when rendered.
    displayFilter: undefined, // Object that defines an angular filter to apply to cell data.
    /* For example, the following would apply the angular date filter:
    displayFilter: {
        name: 'date', // String. Name of the filter to apply.
        options: ['MMM yyyy'] // Array of arguments to pass to the $filter function.
    },
    */
    titleClass: undefined, // Custom css class to apply to the title cell.
    bodyClass: undefined // Custom css class to apply to the body cells in this column.
}];

dt.options = {
    title: 'Table Title', // String. Text for table title.
    searchable: true, // If false, table search bar is not displayed.

    // Pagination options.
    pagination: {
        resultsPerPage: 10, // Number of rows displayed per page.
        resultsPerPageOptions: [10, 25, 50, 100], // Different rpp options.
        maxPageLinks: 5, // Max number of page buttons between prev & next page buttons.
        totalResults: undefined // Total number of results, not just number of results fetched.
    },

    // Scroll options. Pagination trumps scroll if both pagination and scroll are defined.
    // This does allow for deferred loading (defined in options).
    // TODO: Implement this with angular-meterial's virtual-repeat.
    scroll: {
        height: '350px', // Height of the data display.
        addLength: 50 // Number of additional data rows that will be added on each deferred call.
    },

    // Row options.
    row: {
        select: undefined, // Empty Set in the controller scope to store & track selected rows.
        // If selected is undefined, then user is not able to select rows.
        multiSelect: boolean(dt.options.row.selected), // Allows users to select multiple rows.
        // This defaults to true if row.selected is defined, false otherwise.
        selectAll: false, // Allow users to select all/none of the rows. Always defaults to false.
        menu: undefined // If defined, right clicking a row will display a menu. For example:
        /*
        menu: [{
            text: 'View Thing',
            onClick: (row, index) => $state.go('viewThing', { id: row.id })
        }, {
            text: 'Edit Thing',
            onClick: (row, index) => $state.go('editThing', { id: row.id })
        }, {
            text: 'Delete Thing',
            onClick: (row, index) => deleteThing({ id: row.id })
        }]
         */
    },

    // Override default actions.
    override: {
        search: function (searchInput) {
            // When search is executed.
            // searchInput = search input string.
        },
        sort: function (column, index) {
            // When the sort icon is clicked on any of the columns it's enabled for.
            // column = column object for the column where the sort was clicked.
            // index = index of the column where the sort icon was clicked.
        },
        filter: function (filters) {
            // When column filters are applied to the results.
            // filters = object of filter values corresponding with their column index.
            // For example, if filters were applied to columns 3 and 5, filters could look like:
            // filters = {
            //     3: Set{filter_3_2, filter_3_6, filter_3_1},
            //     5: Set{filter_5_4}
            // };
        },
        rowClick: function (event, row, index) {
            // When a row is clicked. If defined, prevents the default row select and multi-select.
            // event = Event object.
            // row = Row data object.
            // index = Index of the row.
        },
        rowDoubleClick: function (event, row, index) {
            // When a row is double clicked. Does not prevent row select or multi-select.
            // event = Event object.
            // row = Row data object.
            // index = Index of the row.
        },
        rowRightClick: function (event, row, index) {
            // When a row is right-clicked. Does not prevent row select or multi-select.
            // event = Event object.
            // row = Row data object.
            // index = Index of the row.
        },
        goToPage: function (start, end) {
            // When the page changes.
            // start = first row displayed on page.
            // end = last row displayed on page.
        },
        resultsPerPage: function (rpp) {
            // When results per page option is changed.
            // rpp = results per page.
        }
    },

    // Invoke some function before the default (or overriden) event action.
    before: {
        // Same options as override.
    },

    // Invoke some function after the default (or overriden) event action.
    after: {
        // Same options as override.
    }
};
