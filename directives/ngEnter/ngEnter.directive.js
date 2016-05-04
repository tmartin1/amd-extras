function ngEnterDirective () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', (event) => {
            var keyCode = event.which || event.keyCode;

            // If enter key is pressed
            if (keyCode === 13) {
                scope.$apply(() => {
                    // Evaluate the expression
                    scope.$eval(attrs.ngEnter, {event: event});
                });

                event.preventDefault();
            }
        });
    };
}

export default angular.module('amd-extras.directive.ngEnter', [])
    .directive('ngEnter', ngEnterDirective);
