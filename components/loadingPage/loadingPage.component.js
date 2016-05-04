let loadingPageComponent = {
    restrict: 'E',
    template: require('./loadingPage.html'),
    controller: ($state, $scope) => {
        $scope.$state = $state;
    }
};

export default angular.module('flexAdmin.component.loadingPage', [])
    .component('loadingPage', loadingPageComponent);
