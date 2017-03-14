(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('scrollButtons', scrollButtons);

    scrollButtons.$inject = ['$templateCache', 'utilityService', '$interval'];

    /* @ngInject */
    function scrollButtons($templateCache, utilityService, $interval) {
        var directive = {
            scope: {
                options: '=scrollButtonsOptions'
            },
            replace: true,
            restrict: 'AE',
            link: link,
            template: $templateCache.get('core/directives/scroll-buttons/views/default.html')
        };
        return directive;

        function link(scope, element, attrs) {

            scope.scrolled = 0;
            scope.maxScrolled = 0;

            scope.containerHeight = jQuery(scope.options.container).height();

            jQuery(scope.options.container).animate({
                scrollTop: 0
            });

            scope.scrollDown = function (event) {
                event.preventDefault();
                scope.maxScrolled = jQuery(scope.options.container + " .wrap-scroll").height();
                if (scope.scrolled <= (scope.maxScrolled - scope.containerHeight)) {
                    scope.scrolled = scope.scrolled + scope.options.scrollDistance;
                    jQuery(scope.options.container).animate({
                        scrollTop: scope.scrolled
                    }, scope.options.scrollSpeed);
                }

                if(utilityService.propertyExists(scope.options, 'scrollDownClick')){
                    scope.options.scrollDownClick();
                }

            };

            scope.scrollUp = function (event) {
                event.preventDefault();
                scope.maxScrolled = jQuery(scope.options.container + " .wrap-scroll").height();
                if (scope.scrolled > 0) {
                    scope.scrolled = scope.scrolled - scope.options.scrollDistance;
                    jQuery(scope.options.container).animate({
                        scrollTop: scope.scrolled
                    }, scope.options.scrollSpeed);
                }

                if(utilityService.propertyExists(scope.options, 'scrollUpClick')){
                    scope.options.scrollUpClick();
                }

            };


            scope.scrollClear = function (event) {
                event.preventDefault();
                scope.scrolled = 0;
                scope.maxScrolled = 0;
                jQuery(scope.options.container).animate({
                    scrollTop: scope.scrolled
                }, scope.options.scrollSpeed);
            };


            scope.options.reset = function () {
                scope.scrollClear();
            };

            $interval(function () {
                scope.containerHeight = jQuery(scope.options.container).height();
                scope.maxScrolled = jQuery(scope.options.container + " .wrap-scroll").height();
            }, 300);

        }

    }


})();

