(function () {
    "use strict";

    angular.module("app.components.event").controller("EventController", EventController);

    EventController.$inject = ['$hydra', '$stateParams', '$http', '$rootScope', '$interval', '$timeout', '$scope'];

    function EventController($hydra, $stateParams, $http, $rootScope, $interval, $timeout, $scope) {

        var vm = this;

        // Set if live(true) or prelive(false)
        vm.live = true;

        // Prevent execute directives until we get api data
        vm.showEvent = false;

        // Get id of event for api data
        vm.eventId = $stateParams.eventId;

        // Set current opened event (by id) - for active class in accordion
        $rootScope.currentEvent = vm.eventId;

        // Initial execute markets
        getMarkets();

        function getMarkets() {
            $http({
                method: 'GET',
                url: $hydra.config.getAbsolutePath($hydra.config.apiUrls.liveEvent)
            }).then(function(response) {

                $rootScope.showMarkets = true;

                var data = response.data.content.events[0];

                vm.eventId = data.eventId;
                vm.bettingType = data.type;

                vm.heading = data.heading;
                vm.date = moment(vm.heading.startDate).format('dddd') + " " + vm.heading.startTime + ", " + moment(vm.heading.startDate).format('DD.MM.YYYY');
                vm.sportName = data.sportName;
                vm.sportType = data.sport;
                vm.markets = data.markets;
                vm.filters = response.data.content.filters;

                // Set interval for live matches (3s)
                if(vm.live){
                    vm.liveInterval = $timeout(getMarkets, 3000);
                }

                vm.showEvent = true;

            });
        }

        // Cancel interval on destroy controller
        $scope.$on("$destroy", function() {
            if (vm.liveInterval) {
                $timeout.cancel(vm.liveInterval);
            }
        });


    }
})();
