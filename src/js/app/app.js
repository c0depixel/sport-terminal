/**
 * File name: app.js
 * Copyright (c) 2016 Bild Studio
 * http://www.bild-studio.com
 */

var libModule = angular.module("app.lib",
    [
        "ui.router",
        "ngSanitize",
        "ui.sortable",
        "ngStorage",
        "ng-virtual-keyboard"
    ]
);

var angularApp = angular.module("app",
    [
        "app.lib",
        "app.core",
        "app.components"
    ]
);

angularApp.config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',
        '$urlMatcherFactoryProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider){

            $urlMatcherFactoryProvider.strictMode(false);

            $httpProvider.defaults.withCredentials = true;

            // Rule that converts url to lower case
            $urlRouterProvider.rule(function($injector, $location) {
                var path = $location.path(),
                    lowerCasePath = path.toLowerCase();

                // if path is not lower case then convert to lower case
                if (path != lowerCasePath) {
                    $location.replace().path(lowerCasePath);
                }
            });

            $urlRouterProvider.otherwise('/app');

            moment.locale('sr');

        }
    ]
);

angularApp.run(
    [
        '$rootScope',
        '$hydra',
        function ($rootScope, $hydra) {

            // Remove splash screen. We delay this in order to wait for other elements to be fully loaded and formed
            setTimeout(function(){
                var $splashScreen = null;

                $splashScreen = angular.element('#splash-screen');

                $splashScreen.fadeOut(400);

                setTimeout(function(){
                    $splashScreen.remove();
                }, 1100);

            }, 2000);

            $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
                console.log("Not Found State");
                console.log(unfoundState, fromState);
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            });

            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                console.log("State Change Error");
                console.log(toState, toParams);
            });

        }
    ]
);
