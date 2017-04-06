
(function () {
    angular
        .module("ProjectMaker")
        .factory("addressAPISearchService", addressAPISearchService);

    function addressAPISearchService($http) {

        var api = {

            "autoCompleteAddress":autoCompleteAddress,
        };

        return api;


        function autoCompleteAddress (addressToLookUp) {
            return $http.get('https://us-autocomplete.api.smartystreets.com/suggest?auth-id=52f5833b-1da4-faba-c50e-867fcf8483ab&auth-token=OBIODzh3R8wnGKwblEFB&prefix='+addressToLookUp);

        }
    }

})();

