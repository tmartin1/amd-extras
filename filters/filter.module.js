import standardCaseFilter from './standardCase.filter.js';
import titleCaseFilter from './titleCase.filter.js';
import camelCaseFilter from './camelCase.filter.js';
import phoneNumberFilter from './phoneNumber.filter.js';
import orderObjectByFilter from './orderObjectBy.filter.js';

export default angular.module('amd-extras.filter', [])
    .filter('standardCase', standardCaseFilter)
    .filter('titleCase', titleCaseFilter)
    .filter('camelCase', camelCaseFilter)
    .filter('phoneNumber', phoneNumberFilter)
    .filter('orderObjectBy', orderObjectByFilter);
