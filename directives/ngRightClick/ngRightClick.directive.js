function ngRightClickDirective ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);

        element.bind('contextmenu', (event) => {
            scope.$apply(() => {
                event.preventDefault();
                fn(scope, {
                    $event: event
                });
            });
        });
    };
}

export default angular.module('amd-extras.directive.ngRightClick', [])
    .directive('ngRightClick', ngRightClickDirective);
