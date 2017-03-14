/**
 * File name: register.controller.js
 * Copyright (c) 2016 Bild Studio
 * http://www.bild-studio.com
 */

(function () {
    "use strict";

    angular.module("app.components.main").controller("RightController", RightController);

    RightController.$inject = ['$hydra', '$rootScope'];

    function RightController($hydra, $rootScope) {

        var vm = this;

        vm.scrollTicketsOptions = {
            container: "#ticket-matches-list",
            scrollToTop: false,
            scrollDistance: 133,
            scrollSpeed : 400
        };

        vm.defaultAmounts = [
            {
                name: "10",
                val: 10
            },
            {
                name: "100",
                val: 100
            },
            {
                name: "Sve",
                val: 5000
            }
        ];

        vm.numericKeyboardOptions = {
            layout: 'custom',
            display: {
                'accept' : 'Potvrdi',
                'cancel'   : 'Zatvori'
            },
            customLayout: {
                'normal': [
                    '{clear}',
                    '1 2 3',
                    '4 5 6',
                    '7 8 9',
                    '0 {dec} {b}',
                    '{cancel} {accept}'
                ]
            },
            restrictInput : true,
            preventPaste : true,
            autoAccept : true,
            beforeVisible: function () {
                $('body').addClass('popup-open');
            },
            beforeClose: function () {
                $('body').removeClass('popup-open');
            }
        };


        vm.setAmount = function (amount) {
            vm.amount = amount;
        };

        vm.clearAmount = function () {
            vm.amount = "";

        };

        vm.payment = function () {

            $rootScope.$broadcast('popup', {
                type: 'error',
                title: 'Štampanje',
                content: 'Tiket se štampa! Molimo sačekajte.',
                timeout: false,
                overlay: true,
                close: true
            });

        };

    }
})();
