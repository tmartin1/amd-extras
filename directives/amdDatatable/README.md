# amdDatatable
Details regarding the `<amd-datatable></amd-datatable>` directive.

## Desired Features
- **Formatting**
    - Table
        - Title (str)
        - Searchable (bool)
    - Columns
        - Display (str) _Relative column width: 'wide', 'normal', 'tight', or 'none'_
        - Sort (bool) _Column is sortable or not_
        - Filter (bool) _Column is filterable or not_
            * Should this be an object that defines filter options? Or should filter options be determined based on the column content? ... or both?
        - Info (str) _will display info icon and show info in popover on click_
        - Custom title class (str) _Class(es) to add to the title cell_
        - Custom row class (str) _Class(es) to add to the body cells in this column_
        - Angular display filter ({ name:(str), options:(arr) }) _Angular filter applied to cells in this column_
        - Callback function (func) _Function called on cell data in this column before they are displayed_
    - Rows
        - Selectable (bool)
        - On click = select row or custom callback
            - Selected rows available to parent controller via... (?)
        - Right click menu
- **Data Loading**
    - Load data from promise
    - Reloading data from promise (search & filtering)
- **Pagination or Infinite Scroll**
    - Both
        - Pre-cache results
    - Pagination
        - Results per page
        - Results per page options
    - Infinite Scroll
        - Rows (num) _determines height of table via number of rows to display_


## Implementation and Default Configuration

```javascript
// example.controller.js
this.exampleTable = {
    data: [],
    pending: true,
    selected: new Set()
};

SomeService.getSomeData().then((data) => {
    this.exampleTable.pending = false;
    this.exampleTable.data.push(...data);
});

this.exampleTable.columns = [{
    // Define datatable column configurations here.
}];

this.exampleTable.options = {
    // Define datatable options here.
};
```

```html
<amd-datatable columns="vm.exampleTable.columns"
    data="vm.exampleTable.data"
    options="vm.exampleTable.options"
    pending="vm.exampleTable.pending">
</amd-datatable>
```

### Arguments
| Param     | Type           | Required  | Summary                                      | Link                |
| :----     | :---           | :-------  | :------                                      | :---                |
| `columns` | String, Array  | true      | Define column titles and customize options.  | [columns](#columns) |
| `data`    | Array, Promise | true      | Table data to be displayed.                  | [data](#data)       |
| `options` | Object         | false     | Configure table options.                     | [options](#options) |
| `pending` | Boolean        | false     | Tell the datatable if there is pending data. | -                   |


## `columns`
_Required. String, Array, or Object._

The `columns` object defines the title and configuration options for each column in the datatable. In most cases (except the simplest of implementations) this will be an array of objects or an object.

### Examples
```javascript
// OK - String of comma separated values:
this.exampleTable.columns = 'Column 1, Column 2, Column 3';

// OK - Array of strings:
this.exampleTable.columns = ['Column 1', 'Column 2', 'Column 3'];

// OK - Array of column objects (for data as arrays):
this.exampleTable.columns = [
    {
        title: 'Column 1',
        sortable: false,
        /* other column options defined here*/
    }, {
        title: 'Column 2',
        hidden: true,
        /* other column options defined here*/
    }, {
        title: 'Column 3',
        displayFilter: {
            name: 'date',
            options: ['yyyy-MM-dd']
        }
        /* other column options defined here*/
    }
];

// OK - Array of column objects (for data as objects):
this.exampleTable.columns = [
    {
        title: 'Column 1',
        key: 'exampleKey',
        sortable: false,
        /* other column options defined here*/
    }, {
        title: 'Column 3',
        key: 'thirdExampleKey',
        displayFilter: {
            name: 'date',
            options: ['yyyy-MM-dd']
        }
        /* other column options defined here*/
    }
];

// Technically it should work, but don't do it - Mixed array of strings and column objects:
this.exampleTable.columns = [
    {
        title: 'Column 1',
        /* other column options defined here*/
    },
    'Column 2',
    {
        title: 'Column 3',
        /* other column options defined here*/
    }
];
```

### Column Properties and Defaults
_All column configuration properties listed below are optional._
    <table>
        <tr>
            <th align="left">Property</th>
            <th align="left">Type</th>
            <th align="left">Default</th>
            <th align="left">Details</th>
        </tr>
        <tr>
            <td><strong>
                `title`
            </strong></td><td>
                String
            </td><td>
                `undefined`
            </td><td>
                Title of the column.
            </td>
        </tr>
        <tr>
            <td><strong>
                `hidden`
            </strong></td><td>
                Boolean
            </td><td>
                `false`
            </td><td>
                Determines visibility of the column.<br>
                `false` - Column is displayed<br>
                `true` - Column is hidden.
            </td>
        </tr>
        <tr>
            <td><strong>
                `align`
            </strong></td><td>
                String
            </td><td>
                `"left"`
            </td><td>
                Defines text alignment for all cells in the column (title and body).<br>
                Valid options are `"left"`, `"right"`, or `"center"`.
            </td>
        </tr>
        <tr>
            <td><strong>
                `width`
            </strong></td><td>
                String
            </td><td>
                `"normal"`
            </td><td>
                Defines general width of the column relative to the other columns.<br>
                Valid options are `"tight"`, `"normal"`, or `"wide"`.
            </td>
        </tr>
        <tr>
            <td><strong>
                `popover`
            </strong></td><td>
                String or Object
            </td><td>
                `undefined`
            </td><td>
                Option to define popover text and icon. This can be either a string or an object. If the value is a string, the default icon will be used. Both of the following are valid examples:<br>
                <br>
                Example 1: Popover as a string<br>
                `column.popover = 'This is the popover text';`
                <br><br>
                Example 2: Popover as an object
                <pre>
    column.popover = {
        text: 'This is the popover text',
        type: 'warning' // 'info' is default.
    };
                </pre>
            </td>
        </tr>
        <tr>
            <td><strong>
                `sortable`
            </strong></td><td>
                Boolean
            </td><td>
                `true`
            </td><td>
                Whether or not the column data should be sortable.<br>
                `true` - Column is sortable.<br>
                `false` - Column is not sortable.
            </td>
        </tr>
        <tr>
            <td><strong>
                `filters`
            </strong></td><td>
                Boolean or Array
            </td><td>
                `false`
            </td><td>
                Whether or not the column data should be filterable.<br>
                `true` - Column is filterable. Filter options are determined by the data.<br>
                `false` - Column is not filterable.<br>
                `["Filter 1", "Filter 2", "..."]` - Column is filterable and the filter options shown are as they are defined in the array.
            </td>
        </tr>
        <tr>
            <td><strong>
                `cellClick`
            </strong></td><td>
                Function
            </td><td>
                `undefined`
            </td><td>
                Function called when a cell in this column is clicked.<br>
                `cellClick = (event, row, colIndex, rowIndex) => /* ... */;`<br>
                `event` - Event object.<br>
                `row` - Row data object.<br>
                `colIndex` - Index of the column.<br>
                `rowIndex` - Index of the row.
            </td>
        </tr>
        <tr>
            <td><strong>
                `dataCallback`
            </strong></td><td>
                Function
            </td><td>
                `undefined`
            </td><td>
                Function called on each of the body cells in this column when rendered. This passes in the cell data as the only parameter.
            </td>
        </tr>
        <tr>
            <td><strong>
                `displayFilter`
            </strong></td><td>
                Object
            </td><td>
                `undefined`
            </td><td>
                Object that defines an angular filter to apply to cell data via the <a href="https://docs.angularjs.org/api/ng/filter/filter">$filter</a> service.<br>
                <br>
                `displayFilter.name` - The name of the filter to be applied.<br>
                `displayFilter.args` - Arguments to be passed into the `$filter` call along with the cell data.<br>
                <br>
                For example:
                <pre>
    displayFilter = {
        name: 'date',
        options: ['MMM yyy']
    };
                </pre>
                Would result in a cell with data `new Date(03-01-1963)` to be displayed as `Mar 1963`.
            </td>
        </tr>
        <tr>
            <td><strong>
                `titleClass`
            </strong></td><td>
                String
            </td><td>
                `undefined`
            </td><td>
                Class name to be applied to the header cell of this column.
            </td>
        </tr>
        <tr>
            <td><strong>
                `bodyClass`
            </strong></td><td>
                String
            </td><td>
                `undefined`
            </td><td>
                Class name to be applied to the body cells in this column.
            </td>
        </tr>
    </table>


## `data`
_Required. Array or Promise._

### Examples
```javascript
// OK - Array of row data arrays:
this.exampleTable.data = [
    ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3'],
    ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3'],
    ['Row 3 Cell 1', 'Row 3 Cell 2', 'Row 3 Cell 3']
];

// OK - Array of row data objects:
this.exampleTable.data = [
    {
        exampleKey: 'Row 1 Cell 1',
        secondExampleKey: 'Row 1 Cell 2',
        thirdExampleKey: 'Row 1 Cell 3'
    }, {
        exampleKey: 'Row 2 Cell 1',
        secondExampleKey: 'Row 2 Cell 2',
        thirdExampleKey: 'Row 2 Cell 3'
    }, {
        exampleKey: 'Row 3 Cell 1',
        secondExampleKey: 'Row 3 Cell 2',
        thirdExampleKey: 'Row 3 Cell 3'
    }
];

// OK - Empty array that is populated at a later time in the controller:
this.exampleTable = {
    data: [],
    pending: true
};

SomeService.getSomeData()
    .then((data) => {
        this.exampleTable.pending = false;
        this.exampleTable.data.push(...data);
    });

// OK - Promise that resolves in an array of row data arrays:
this.exampleTable.data = getDataFromServer();
```

## `data options`
_optional. suspended, disabled, or customClass properties will add a corresponding class to each table row._

### Examples
```javascript
// OK - Array of row data arrays:
row = ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3'];
row.suspended = true;
row.disabled = false;
row.customClass = 'customClassName';
this.exampleTable.data = [
    row,
    ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3'],
    ['Row 3 Cell 1', 'Row 3 Cell 2', 'Row 3 Cell 3']
];
```

## `options`
_Optional. Object. Define the title and other various aspects of the amdDatatable._

### Examples
```javascript
this.exampleTable.options = {
    title: 'Datatable Title',
    searchable: false,
    pagination: {
        resultsPerPage: UserService.accountOptions.preferredResultsPerPage
    },
    before: {
        search: getSearchResultsFromServer(input),
        filter: getFilteredSearchResultsFromServer(filters),
        sort: getSortedSearchResultsFromServer(column, index)
    }
};
```

### Options Properties and Defaults
_Various options to customize the appearance and behavior of the amdDatatable._
    <table>
        <tr>
            <th align="left">Property</th>
            <th align="left">Type</th>
            <th align="left">Default</th>
            <th align="left">Details</th>
        </tr>
        <tr>
            <td><strong>
                `title`
            </strong></td><td>
                String
            </td><td>
                `undefined`
            </td><td>
                Title of the table.
            </td>
        </tr>
        <tr>
            <td><strong>
                `searchable`
            </strong></td><td>
                Boolean
            </td><td>
                `true`
            </td><td>
                Set the searchability of the data.<br>
                `true` - Table data is searchable, search box is shown.<br>
                `false` - Table data is not searchable, search box is not shown.
            </td>
        </tr>
        <tr>
            <td><strong>
                `pagination`
            </strong></td><td>
                Object
            </td><td>
                _see details_
            </td><td>
                Define pagination settings. If scroll options are defined (see `scroll`), this defaults to `undefined`, otherwise, the default pagination options are as follows:
                <dl>
                    <dt>`rowsPerPage = 10`</dt>
                    <dd>
                        Number of rows displayed per page.
                    </dd>
                    <dt>`resultsPerPageOptions = [10, 25, 50, 100]`</dt>
                    <dd>
                        Options shown when the 'results per page' dropdown is clicked.
                    </dd>
                    <dt>`maxPageLinks = 5`</dt>
                    <dd>
                        Max number of page buttons between prev & next page buttons.
                    </dd>
                    <dt>`totalResults = undefined`</dt>
                    <dd>
                        Total number of results. If this is left undefined, the total number of results will be assumed to be the length of the data array provided.
                    </dd>
                </dl>
            </td>
        </tr>
        <tr>
            <td><strong>
                `scroll`
            </strong></td><td>
                Object
            </td><td>
                _see details_
            </td><td>
                Define scroll options. This is ignored if pagination options are defined. This does allow for deferred loading.
                <dl>
                    <dt>`height = 350px`</dt>
                    <dd>
                        Height of the data display.
                    </dd>
                    <dt>`addLength = 50`</dt>
                    <dd>
                        Number of additional data rows that will be added on each deferred call.
                    </dd>
                </dl>
            </td>
        </tr>
        <tr>
            <td><strong>
                `row`
            </strong></td><td>
                Object
            </td><td>
                _see details_
            </td><td>
                Row interaction options.<br>
                <dl>
                    <dt>`select = undefined`</dt>
                    <dd>
                        Empty Set in the controller scope to store & track selected rows. If selected is undefined, then user is not able to select rows.
                    </dd>
                    <dt>`multiSelect = !!select`</dt>
                    <dd>
                        Allows users to select multiple rows. This defaults to true if selected is defined, false otherwise.
                    </dd>
                    <dt>`selectAll = false`</dt>
                    <dd>
                        Allow users to select all/none of the rows. Always defaults to false.
                    </dd>
                    <dt>`menu = undefined`</dt>
                    <dd>
                        If defined, right clicking a row will display a menu. For example:<br>
                        <pre>
    menu: [{
       text: 'View Thing',
       onClick: (row) => $state.go('viewThing', { id: row.id })
    }, {
       text: 'Edit Thing',
       onClick: (row) => $state.go('editThing', { id: row.id })
    }, {
       text: 'Delete Thing',
       onClick: (row) => deleteThing({ id: row.id })
    }]
                        </pre>
                    </dd>
                </dl>
            </td>
        </tr>
        <tr>
            <td><strong>
                `override`
            </strong></td><td>
                Object
            </td><td>
                `undefined`
            </td><td>
                Define functions to override default actions. The following actions can be overridden:
                <dl>
                    <dt>`search (searchInput)`</dt>
                    <dd>
                        Triggers when search is executed.<br>
                        `searchInput` - Search input string.
                    </dd>
                    <dt>`sort (column, index)`</dt>
                    <dd>
                        Triggers when the sort icon is clicked on any of the columns it's enabled for.<br>
                        `column` - column object for the column where the sort was clicked.<br>
                        `index` - index of the column where the sort icon was clicked.
                    </dd>
                    <dt>`filter (filters)`</dt>
                    <dd>
                        Triggers when filters are applied to the results. `filters` is an object of filter values corresponding with their column index. For example, if filters were applied to columns 3 and 5, filters could look like:
                        <pre>
    filters = {
        3: Set{filter_3_2, filter_3_6, filter_3_1},
        5: Set{filter_5_4}
    };
                        </pre>
                    </dd>
                    <dt>`rowClick (event, row, index)`</dt>
                    <dd>
                        Triggers when a row is clicked. If defined, this prevents the default select and multi-select actions.<br>
                        `event` - Event object.<br>
                        `row` - Row data object.<br>
                        `index` - Index of the row.
                    </dd>
                    <dt>`rowDoubleClick (event, row, index)`</dt>
                    <dd>
                        Triggers when a row is double clicked. The default action is the same as the row click action (currently this is to select the row). If the default row click action is overridden, this will execute the new row click action. Does not prevent row selection on single clicks.<br>
                        `event` - Event object.<br>
                        `row` - Row data object.<br>
                        `index` - Index of the row.
                    </dd>
                    <dt>`rowRightClick (event, row, index)`</dt>
                    <dd>
                        Triggers when a row is right-clicked. If defined, this prevents the default action of showing a menu. Does not prevent row selection on left-clicks.<br>
                        `event` - Event object.<br>
                        `row` - Row data object.<br>
                        `index` - Index of the row.
                    </dd>
                    <dt>`goToPage (page)`</dt>
                    <dd>
                        Triggers when the page is changed.<br>
                        `page` - Number of the page that it is going to (index of that page + 1).
                    </dd>
                    <dt>`resultsPerPage (rpp)`</dt>
                    <dd>
                        Triggers when the results per page option is changed.<br>
                        `rpp` - Results per page.
                    </dd>
                </dl>
            </td>
        </tr>
        <tr>
            <td><strong>
                `before`
            </strong></td><td>
                Object
            </td><td>
                `undefined`
            </td><td>
                Define functions to be invoked before the default (or overridden) function is invoked for a specific action. Properties for this are the same as those in the `override` section.
            </td>
        </tr>
        <tr>
            <td><strong>
                `after`
            </strong></td><td>
                Object
            </td><td>
                `undefined`
            </td><td>
                Define functions to be invoked after the default (or overridden) function is invoked for a specific action. Properties for this are the same as those in the `override` section.
            </td>
        </tr>
    </table>
