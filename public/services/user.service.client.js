(function (){
    angular
        .module("ProjectMaker")
        .factory("userService",userService);

    function userService ($http) {


        var api = {
            "createUser": createUser,
            "findUserByID":findUserByID,
            "findUserByCredentials":findUserByCredentials,
            "updateUser":updateUser,
            "deleteUser": deleteUser,
            "findDeliveryBoyByRestaurant":findDeliveryBoyByRestaurant,
            "updateAvailabiltyofDB":updateAvailabiltyofDB,
            "findActiveDeliveryBoyByRestaurant":findActiveDeliveryBoyByRestaurant,
            "getAllOrdersForThisDeliveryBoy":getAllOrdersForThisDeliveryBoy
        };


        return api;


        function updateAvailabiltyofDB(userId,user) {
            console.log("hello");
            console.log(userId);
            console.log(user);
            return $http.put('/api/users/'+userId,user);
        }


        function findDeliveryBoyByRestaurant(restaurantId) {
            // console.log("CLIENT",restaurantId);
            return $http.get('/api/users/'+ restaurantId);
        }


        function createUser (user) {
            return $http.post('/api/user/', user);
        }
        function findUserByID (userId) {
            return $http.get('/api/user/'+ userId);

        }

        function findUserByCredentials(username,password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(userId, user) {
            return $http.put("/api/user/"+userId, user);
        }

        function deleteUser(userId) {
           return $http.delete("/api/user/"+userId);
        }

        function findActiveDeliveryBoyByRestaurant(restaurantId) {
            return $http.get( "/api/users/activedelboys/"+restaurantId);
        }
        function getAllOrdersForThisDeliveryBoy(userId) {
            console.log("hello");
            return $http.get( "/api/users/"+userId+"/orders/");
        }


    }
})();