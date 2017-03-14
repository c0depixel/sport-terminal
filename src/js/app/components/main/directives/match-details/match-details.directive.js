(function () {
    'use strict';

    angular
        .module('app.components.main')
        .directive('matchDetails', matchDetails);

    matchDetails.$inject = ['$templateCache', 'utilityService', '$interval', '$sce', '$compile'];

    /* @ngInject */
    function matchDetails($templateCache, utilityService, $interval, $sce, $compile) {
        var directive = {
            scope: false,
            replace: true,
            restrict: 'AE',
            link: link,
            template: $templateCache.get('components/main/directives/match-details/views/default.html')
        };
        return directive;

        function link(scope, element, attrs) {


        }

    }


})();

