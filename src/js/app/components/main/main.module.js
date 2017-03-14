/**
 * File name: main.module.js
 * Copyright (c) 2016 Bild Studio
 * http://www.bild-studio.com
 */

(function() {
    "use strict";

    angular
        .module("app.components.main", [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider
            .state('main',
                {
                    url: '',
                    parent: "app",
                    views: {
                        "content": {
                            controller: "ContentController",
                            controllerAs: "content",
                            templateUrl: "components/main/views/content.html"
                        },
                        "right-sidebar": {
                            controller: "RightController",
                            controllerAs: "right",
                            templateUrl: "components/main/views/right.html"
                        }
                    }
                }
            );
    }
})();
