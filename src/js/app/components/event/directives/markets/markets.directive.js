(function () {
    'use strict';

    angular
        .module('app.components.event')
        .directive('markets', markets);

    markets.$inject = ['$templateCache', 'utilityService', '$interval', '$filter'];

    /* @ngInject */
    function markets($templateCache, utilityService, $interval, $filter) {
        var directive = {
            scope: false,
            replace: true,
            restrict: 'AE',
            link: link,
            template: $templateCache.get('components/event/directives/markets/views/default.html')
        };
        return directive;

        function link(scope, element, attrs) {

            scope.selectedFilters = [1];

            scope.filterToggle = function (id) {
                if(scope.selectedFilters.indexOf(id) !== -1){
                    scope.selectedFilters = $.grep(scope.selectedFilters, function(value) {
                        return value != id;
                    });
                }
                else{
                    scope.selectedFilters.push(id);
                }
            };

            scope.filterMarkets = function (filters) {
                return (scope.selectedFilters.indexOf(filters.filterId) !== -1);
            }

        }

    }


})();

