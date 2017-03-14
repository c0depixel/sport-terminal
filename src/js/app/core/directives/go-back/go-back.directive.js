(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('goBack', goBack);

    goBack.$inject = ['$templateCache', '$rootScope', '$state', 'utilityService'];

    /* @ngInject */
    function goBack($templateCache, $rootScope, $state, utilityService) {
        var directive = {
            scope: false,
            replace: true,
            restrict: 'AE',
            link: link,
            template: $templateCache.get('core/directives/go-back/views/default.html')
        };
        return directive;

        function link(scope, element, attrs) {
            scope.goBack = function () {
                $rootScope.showMarkets = false;
                $rootScope.currentEvent = null;
                $state.go('main');
            }
        }

    }


})();

