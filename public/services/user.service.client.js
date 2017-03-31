(function (){
    angular
        .module("ProjectMaker")
        .factory("userService",userService);

    function userService ($http) {


        var api = {
            "createUser": createUser,
            "findUserByID":findUserByID,
            "findUserByCredentials":findUserByCredentials
        };


        return api;

        function createUser (user) {
            return $http.post('/api/user/', user);
        }
        function findUserByID (userId) {
            return $http.get('/api/user/'+ userId);

        }

        function findUserByCredentials(username,password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }





    }
})();