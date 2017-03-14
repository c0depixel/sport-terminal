(function () {
    'use strict';

    angular
        .module('app.core')
        .service('utilityService', utilityService);

    utilityService.$inject = ['$http', '$timeout'];

    /* @ngInject */
    function utilityService($http, $timeout) {

        this.propertyExists = propertyExists;

        function propertyExists(obj, key) { 
            return key.split(".").every(function (x) {
                if(typeof obj != "object" || obj === null || !(x in obj)){
                    return false;
                }
                obj = obj[x];
                return true;
            });
        };

    }

})();

