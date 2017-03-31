/**
 * Created by aashi on 3/30/2017.
 */
(function (){
    angular.module('ProjectMaker')
        .controller('userLoginController', userLoginController);

    function userLoginController(userService, $location) {

        var vm = this;
        vm.login = login;

        vm.registerUser=registerUser;

        function login(user) {

            var promise=userService.findUserByCredentials(user.username, user.password);
            promise.success(function (user) {


                $location.url("/user/"+user._id);
            }).error(function (err) {

            })
        }

        function registerUser(role) {
            $location.url("/register/"+role);
        }


    }

})();