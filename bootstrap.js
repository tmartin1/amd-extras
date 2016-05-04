/*jshint browser:true */
'use strict';

import appModule from './index';

angular.element(document).ready(() => {
    angular.bootstrap(document, [appModule.name], {
        // strictDi: true
    });
});
