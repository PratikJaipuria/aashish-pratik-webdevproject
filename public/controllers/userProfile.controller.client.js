(function (){
    angular.module('ProjectMaker')
        .controller('userProfileController', userProfileController);

    function userProfileController ($http) {

        var vm = this;
        vm.searchRest=searchRest;

        function init () {
            // var es = document.createElement('script'); es.type = 'text/javascript'; es.async = true;
            // es.src = ('https:' == document.location.protocol ? 'https://' : 'http://developers.') + 'eatstreet.com/api-js-sdk/js/sdk-remote.js';
            // var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(es, s);
            // console.log(s);
            // // esapi.init('6fb883f6655311b6');
        } init();


        function searchRest(name) {
            // esapi.searchRestaurants({ 'street-address': '316 W. Washington Ave. Madison, WI' }, function(response) {
            //     var address = response.address;
            //     var restaurants = response.restaurants;
            //     console.log(address, restaurants);
            // });
            var token='6fb883f6655311b6';
            $http.get('https://api.eatstreet.com/publicapi/v1/restaurant/search?access-token=6fb883f6655311b6&method=both&street-address=Boston')               // {headers: {'x-access-token': '6fb883f6655311b6','Accept': 'application/json'}}

                .then(function(response) {

                    console.log(response);
                });
            // curl -X GET -H "X-Access-Token: 6fb883f6655311b6"  "https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&street-address=316+W.+Washington+Ave.+Madison,+WI"
        }


    };
})();

// curl -X GET -H 'X-Access-Token: 6fb883f6655311b6' 'https://api.eatstreet.com/publicapi/v1/restaurant/ee3f841c5988f406459c89af9c680205d30b6aeaa238f8d1/menu?includeCustomizations=true'