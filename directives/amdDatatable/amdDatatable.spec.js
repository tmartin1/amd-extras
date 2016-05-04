// Unit tests for amdDatatable directive.
describe('Datatable controller', () => {
    beforeEach(angular.mock.module('amd-extras'));

    var $compile;
    var $rootScope;
    beforeEach(angular.mock.inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_.$new();
    }));

    describe('simplest configuration', () => {
        var element;
        var dt;
        beforeEach(() => {
            // Build and compile the directive.
            $rootScope.vm = dtConfig('simple');
            element = $compile(
                '<amd-datatable columns="vm.cols" options="vm.ops" tabledata="vm.data">' +
                '</amd-datatable>'
            )($rootScope);
            $rootScope.$digest();
            dt = $rootScope.$$childHead.dt;
        });

        it('should create an <md-card> element wrapped in a <amd-datatable> DOM element', () => {
            expect(element[0].tagName).toBe('amd-datatable');
            expect(element[0].children[0].tagName).toBe('MD-CARD');
        });

        it('should have a controller attached to the scope as "dt"', () => {
            expect(dt).toBeDefined();
        });

        it('should watch vm and update internal directive data accordingly', () => {
            let initialLength = dt.tableData.length;
            expect(initialLength).toBe($rootScope.vm.data.length);
            $rootScope.vm.data.push(['four']);
            $rootScope.$digest();
            expect($rootScope.$$childHead.dt.tableData.length).toBe(initialLength + 1);
        });

        it('should have a title: Simple Title', function () {
            expect(element.html()).toContain('Simple Title');
        });
    });

    /**
     * Build an object to act as the $scope.vm object with all needed amdDatatable properties.
     * @param  {String} [complexity = 'simple'] - Determine complexity of the table.
     * @return {Object} Object to replicate the vm object on the scope.
     */
    function dtConfig (complexity) {
        return {
            simple: {
                cols: ['first'],
                ops: {
                    title: 'Simple Title'
                },
                data: [['one'], ['two'], ['three']]
            }
        }[complexity || 'simple'];
    }

});
