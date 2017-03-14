/**
 * File name: hydra.service.js
 * Copyright (c) 2016 Bild Studio
 * http://www.bild-studio.com
 */

(function () {
    "use strict";

    angular
        .module("app.core")
        .factory("$hydra", hydra);

    hydra.$inject = [
        "$location",
        "$state",
        "$stateParams",
        "$timeout",
        "$templateCache",
        "$configService",
        "$localStorage"
    ];

    function hydra($location, $state, $stateParams, $timeout, $templateCache, $configService, $localStorage) {
        return {
            location: $location,
            state: $state,
            stateParams: $stateParams,
            timeout: $timeout,
            templateCache: $templateCache,
            config: $configService,
            localStorage: $localStorage
        };
    }

})();
