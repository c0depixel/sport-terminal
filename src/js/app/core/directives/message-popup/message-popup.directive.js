(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('messagePopup', messagePopup);

    messagePopup.$inject = ['$templateCache', 'utilityService', '$interval', '$timeout', '$compile'];

    /* @ngInject */
    function messagePopup($templateCache, utilityService, $interval, $timeout, $compile) {
        var directive = {
            scope: true,
            restrict: 'AE',
            link: link
        };
        return directive;

        function link(scope, element, attrs) {

            var defaultOptions = {
                type: 'error', // success, error, warning, info
                title: 'Hello world', // notification title
                content: 'Lorem ipsum', // notification content
                timeout: null, // timeout for closing popup
                overlay: false, // show/hide transparent dark overlay
                close: true // show/hide close button
            };

            var popup;
            var timeout;

            var template = $templateCache.get('core/directives/message-popup/views/default.html');

            scope.close = function() {
                $timeout.cancel(timeout);
                $('body').removeClass('popup-open');
                if(popup){
                    popup.remove();
                }
            };

            scope.show = function(data) {
                scope.close();

                scope.data = angular.merge({}, defaultOptions, data);

                if(scope.data.overlay) {
                    $('body').addClass('popup-open');
                }

                popup = $compile(template)(scope);
                popup.appendTo('body');

                if(scope.data.timeout){
                    timeout = $timeout(scope.close, scope.data.timeout);
                }
            };

            scope.$on('popup', function(event, data) {
                scope.show(data);
            });

        }

    }


})();
