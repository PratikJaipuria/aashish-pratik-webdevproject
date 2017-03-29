/**
 * Created by Pratik on 3/26/2017.
 */
(function () {
    angular
        .module("ProjectMaker")
        .factory("restaurantSearchMenuService", restaurantSearchMenuService);

    function restaurantSearchMenuService($http) {

        var api = {

            "searchMenu":searchMenu
        };

        return api;




        function searchMenu(restaurantId) {

            var token='6fb883f6655311b6';
            return $http.get('https://api.eatstreet.com/publicapi/v1/restaurant/'+restaurantId+'/menu/?access-token=6fb883f6655311b6');


          //  https://api.eatstreet.com/publicapi/v1/restaurant/90fd4587554469b1f15b4f2e73e761809f4b4bcca52eedca/menu?includeCustomizations=false

        }
    }

})();