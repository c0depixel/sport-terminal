/**
 * File name: register.controller.js
 * Copyright (c) 2016 Bild Studio
 * http://www.bild-studio.com
 */

(function () {
    "use strict";

    angular.module("app.components.main").controller("ContentController", ContentController);

    ContentController.$inject = ['$hydra', '$scope', '$http', '$interval', '$timeout', '$state', '$rootScope'];

    function ContentController($hydra, $scope, $http, $interval, $timeout, $state, $rootScope) {

        var vm = this;

        vm.live = false;

        $rootScope.showMarkets = false;
        vm.activeSportId = 0;
        vm.activeDayId = 2;

        vm.scrollMatchesOptions = {
            container: "#matches-list",
            scrollToTop: true,
            scrollDistance: 180,
            scrollSpeed : 400,
            scrollUpClick: function () {
                console.log("idi dolje");
            }
        };

        vm.scrollOpenMatchOptions = {
            container: "#open-match",
            scrollToTop: true,
            scrollDistance: 150,
            scrollSpeed : 400
        };

        vm.openEvent = function (id) {
            $state.go('event', {eventId: id});
        };

        vm.openGroup = function (id) {
            $('.group-accordion').find('li[data-acc-id='+ id +']').toggleClass('opened');
            $('.group-accordion').find('li[data-acc-id='+ id +'] .group-content').slideToggle(400);
        };


        vm.daysList = [
            {
                id: 1,
                name: "Svi dani"
            },
            {
                id: 2,
                name: "Danas"
            },
            {
                id: 3,
                name: "Subota",
                icon: "D"
            },
            {
                id: 4,
                name: "Nedelja"
            },
            {
                id: 5,
                name: "Ponedeljak"
            },
            {
                id: 6,
                name: "Utorak"
            },
            {
                id: 7,
                name: "Srijeda"
            },
            {
                id: 8,
                name: "Četvrtak"
            }

        ];


        vm.setDay = function (id) {
            vm.activeDayId = id;
            $state.go('main');
        };


        getGroups();

        function getGroups() {
            $http({
                method: 'GET',
                url: $hydra.config.getAbsolutePath($hydra.config.apiUrls.group)
            }).then(function(response) {

                var data = response.data.content;

                vm.sportsData = $.map(data.sports, function(value) {
                    return [value];
                });

                vm.sports = vm.sportsData.map(function(sport, index) {
                    return {
                        id: index,
                        sportName: sport.sportName,
                        title: sport.title,
                        icon: sport.sportIcon
                    }
                });

                vm.setSport(vm.activeSportId, false);

                // Set interval for live matches (3s)
                if(vm.live){
                    vm.liveInterval = $timeout(getGroups, 3000);
                }

            });
        }

        vm.setSport = function (id, state) {
            vm.activeSportId = id;
            vm.activeSport = vm.sportsData[id].tournaments;
            if (state){
                $rootScope.showMarkets = false;
                $rootScope.currentEvent = null;
                $state.go('main');
            }
        };


        // to-do nenad: Function for market betting
        vm.betMarket = function (eventId, quotaId) {
            console.log("event id: " + eventId);
            console.log("quota id: " + quotaId);
        };

        // Cancel interval on destroy controller
        $scope.$on("$destroy", function() {
            if (vm.liveInterval) {
                $timeout.cancel(vm.liveInterval);
            }
        });

    }
})();
