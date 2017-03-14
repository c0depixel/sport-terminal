/**
 * File name: main.module.js
 * Copyright (c) 2016 Bild Studio
 * http://www.bild-studio.com
 */

(function() {
    "use strict";

    angular
        .module("app.components.event", [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {

        $stateProvider
            .state('event',
                {
                    url: '/event/:eventId',
                    params: {
                        eventId: null
                    },
                    parent: "main",
                    views: {
                        "event": {
                            controller: "EventController",
                            controllerAs: "event",
                            templateUrl: "components/event/views/event.html"
                        }
                    }
                }
            );
    }
})();
