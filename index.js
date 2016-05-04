import directiveModule from './directives/directive.module.js';
import filterModule from './filters/filter.module.js';

export default angular
    .module('amd-extras', [
        directiveModule.name,
        filterModule.name
    ])
    .config(function routerConfig ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    });
