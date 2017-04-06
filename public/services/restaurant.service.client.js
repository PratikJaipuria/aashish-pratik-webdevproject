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
            "deleteRestaurant":deleteRestaurant,
            "createAPIResturantIfNotExist":createAPIResturantIfNotExist,
            "findAllPartnerResturantsInThisLocation":findAllPartnerResturantsInThisLocation,

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

        function createAPIResturantIfNotExist (restaurant) {
         return   $http.post('/api/apiresturant/create',restaurant);
        }

        function findAllPartnerResturantsInThisLocation(search) {
            console.log("Inside client service",search);
            return $http.get('/api/partnerRestaurant?name='+search.name+'&address='+search.address);
        }
    }
})();