/**
 * Datatable directive.
 * Please read the README.md and example.js documents in this directory before making any changes to
 * this file or the amdDatatable.controller.js file.
 *
 * ***** See the README.md for detailed information about this directive *****
 */

import DatatableController from './amdDatatable.controller.js';
import rowFilter from './resources/row.filter.js';
import startFromFilter from './resources/startFrom.filter.js';
import sortByColumnFilter from './resources/sortByColumn.filter.js';

class DatatableDirective {
    constructor () {
        this.restrict = 'EA';
        this.template = require('./amdDatatable.html');
        this.scope = {
            columns: '<',
            tabledata: '<',
            options: '<',
            pending: '<'
        };
        this.controller = DatatableController;
        this.controllerAs = 'dt';
        this.bindToController = true;
        this.link = (scope) => {
            scope.tabledata = scope.dt.tabledata;
            scope.$watchCollection('tabledata', () => {
                scope.dt._updateTableData();
            });
        };
    }
}

export default angular.module('amd-extras.directive.amdDatatable', [])
    .directive('amdDatatable', () => new DatatableDirective())
    .filter('rowFilter', rowFilter)
    .filter('startFrom', startFromFilter)
    .filter('sortByColumn', sortByColumnFilter);
