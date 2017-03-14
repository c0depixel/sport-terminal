(function() {
    'use strict';

    angular
        .module("app.core")
        .factory('$configService', configService);

    function configService(){
        return {
            debug: debug,
            userId: null,
            token: null,
            userName: null,
            shopId: null,
            shiftId: null,
            getAbsolutePath: getAbsolutePath,
            apiUrls: apiUrls()
        };

        // activate or disable debug
        function debug(status, type){
            // TODO implement
        }

        // return absolute path depend on environment
        function getAbsolutePath(url){

            var currentUrl = window.location;
            currentUrl = currentUrl.protocol + "//" + currentUrl.host;
            var baseUrl = "";

            if(currentUrl.indexOf("local") !== -1){
                baseUrl = "";
            }
            else if(currentUrl.indexOf("dev") !== -1){
                baseUrl = "http://hydra-express.dev:3000";
            }
            else{
                baseUrl = "";
                //baseUrl = "http://hydra-express.local.bildhosting.me";
            }

            return baseUrl + url;
        }

        function apiUrls() {
            return {
                preliveEvent: "data/prelive/soccer.json",
                liveEvent: "data/live/soccer.json",
                group: "data/group.json"
            };
        }
    }
})();
