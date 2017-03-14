(function () {
    'use strict';

    angular
        .module('app.components.main')
        .directive('horizontalMarkets', horizontalMarkets);

    horizontalMarkets.$inject = ['$templateCache', 'utilityService', '$interval', '$sce', '$compile'];

    /* @ngInject */
    function horizontalMarkets($templateCache, utilityService, $interval, $sce, $compile) {
        var directive = {
            scope: false,
            replace: true,
            restrict: 'AE',
            link: link,
            template: $templateCache.get('components/main/directives/horizontal-markets/views/default.html')
        };
        return directive;

        function link(scope, element, attrs) {


        }

    }


})();

