(function (){
    angular
        .module("ProjectMaker")
        .factory("userService",userService);

    function userService ($http) {


        var api = {
            "createUser": createUser
        };


        return api;

        function createUser (user) {
            return $http.post('/api/user/', user);
        }





    }
})();