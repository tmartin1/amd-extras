let _defaultDiameter = '50px';
let _defaultMode = 'indeterminate';

class SpinnerDirective {
    constructor () {
        this.restrict = 'E';
        this.template = require('./spinner.html');
        this.scope = {
            pending: '=',
            mode: '@',
            theme: '@',
            diameter: '@'
        };
        this.controllerAs = 'spinner';
        this.bindToController = true;
    }

    link (scope, element) {
        // Set position in center of parent element.
        setTimeout(() => {
            let parentWidth = Number(element[0].parentElement.clientWidth);
            let parentHeight = Number(element[0].parentElement.clientHeight);
            let shift = parseInt(scope.spinner.diameter) / 2;

            element.css('position', 'absolute');
            element.css('top', (parentHeight / 2) - shift + 'px');
            element.css('right', (parentWidth / 2) - shift + 'px');
        });
    }

    controller () {
        // Set default values if not passed in.
        this.diameter = this.diameter || _defaultDiameter;
        this.mode = this.mode || _defaultMode;
    }
}

export default angular.module('amd-extras.directive.spinner', [])
    .directive('spinner', () => new SpinnerDirective());
