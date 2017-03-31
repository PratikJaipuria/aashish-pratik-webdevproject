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
            "findRestaurantById":findRestaurantById,
            "updateRestaurant":updateRestaurant,
            "deleteRestaurant":deleteRestaurant

        };


        return api;


        function deleteRestaurant(restaurantId) {
            return $http.delete('/api/restaurant/'+restaurantId);

        }

        function updateRestaurant(restaurantId,restaurant) {
            return $http.put('/api/restaurant/'+restaurantId,restaurant);
        }

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