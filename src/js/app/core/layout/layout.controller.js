/**
 * File name: main.controller.js
 * Copyright (c) 2016 Bild Studio
 * http://www.bild-studio.com
 */

(function () {
    'use strict';

    angular
        .module("app.core.layout")
        .controller("LayoutController", LayoutController);

    LayoutController.$inject = [
        "$scope",
        "$hydra"
    ];

    function LayoutController($scope, $hydra) {

        var ctrlMain = this;

    }

})();
