/**
 * Created by Pratik on 3/30/2017.
 */
(function (){
    angular
        .module("ProjectMaker")
        .factory("restaurantService",restaurantService);

    function restaurantService ($http) {


        var api = {
            "createRestaurant": createRestaurant,
            "findRestaurantByOwner":findRestaurantByOwner,
            "findRestaurantById":findRestaurantById

        };


        return api;

        function createRestaurant (userId,restaurant) {
            return $http.post('/api/user/'+userId+'/restaurant/',restaurant);
        }

        function findRestaurantByOwner(userId) {
            return $http.get('/api/user/'+userId+'/restaurant');
        }

        function findRestaurantById(restaurantId) {
            return $http.get('/api/restaurant/'+restaurantId);

        }
    }
})();