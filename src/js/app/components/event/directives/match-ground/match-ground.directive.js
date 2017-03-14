(function () {
    'use strict';

    angular
        .module('app.components.event')
        .directive('matchGround', matchGround);

    matchGround.$inject = ['$templateCache', 'utilityService', '$interval', '$sce', '$compile'];

    /* @ngInject */
    function matchGround($templateCache, utilityService, $interval, $sce, $compile) {
        var directive = {
            scope: false,
            replace: true,
            restrict: 'AE',
            link: link,
            template: $templateCache.get('components/event/directives/match-ground/views/default.html')
        };
        return directive;

        function link(scope, element, attrs) {

            var bgTemplate;
            var metchDetailsTemplate;

            scope.background = function () {

                switch (scope.event.sportType) {
                    case "soccer":
                        bgTemplate = $templateCache.get('components/event/directives/match-ground/views/backgrounds/soccer.html');
                        break;
                    case "basketball":
                        bgTemplate = $templateCache.get('components/event/directives/match-ground/views/backgrounds/basketball.html');
                        break;
                    case "tennis":
                        bgTemplate = $templateCache.get('components/event/directives/match-ground/views/backgrounds/tennis.html');
                        break;
                    case "volleyball":
                        bgTemplate = $templateCache.get('components/event/directives/match-ground/views/backgrounds/volleyball.html');
                        break;
                    case "football":
                        bgTemplate = $templateCache.get('components/event/directives/match-ground/views/backgrounds/football.html');
                        break;
                    case "ice-hockey":
                        bgTemplate = $templateCache.get('components/event/directives/match-ground/views/backgrounds/ice-hockey.html');
                        break;
                    case "rugby":
                        bgTemplate = $templateCache.get('components/event/directives/match-ground/views/backgrounds/rugby.html');
                        break;
                    case "handball":
                        bgTemplate = $templateCache.get('components/event/directives/match-ground/views/backgrounds/handball.html');
                        break;
                    case "snooker":
                        bgTemplate = $templateCache.get('components/event/directives/match-ground/views/backgrounds/snooker.html');
                        break;
                    case "waterpolo":
                        bgTemplate = $templateCache.get('components/event/directives/match-ground/views/backgrounds/waterpolo.html');
                        break;
                    default :
                        bgTemplate = ""
                }

                return $sce.trustAsHtml(bgTemplate);
            };

            if(scope.event.live){
                metchDetailsTemplate = $templateCache.get('components/event/directives/match-ground/views/live/match-details.html');
                $compile(metchDetailsTemplate)(scope).appendTo(angular.element("#match-details"));
            }
            else{
                metchDetailsTemplate = $templateCache.get('components/event/directives/match-ground/views/prelive/match-details.html');
                $compile(metchDetailsTemplate)(scope).appendTo(angular.element("#match-details"));
            }

        }

    }


})();

