export default angular.module('amd-extras.directive', [
    require('./ngRightClick/ngRightClick.directive.js').default.name,
    require('./ngEnter/ngEnter.directive.js').default.name,
    require('./amdInput/amdInput.directive.js').default.name,
    require('./spinner/spinner.directive.js').default.name,
    require('./amdDatatable/amdDatatable.directive.js').default.name
]);
