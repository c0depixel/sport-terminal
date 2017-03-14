/**
 * File name: main.module.js
 * Copyright (c) 2016 Bild Studio
 * http://www.bild-studio.com
 */

(function() {
    "use strict";

    angular
        .module("app.core.layout", [])
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("app",
                {
                    abstract: true,
                    url: "/app",
                    controller: "LayoutController",
                    controllerAs: "ctrlLayout",
                    templateUrl: "core/layout/views/layout.html"
                }
            );
    }
})();
