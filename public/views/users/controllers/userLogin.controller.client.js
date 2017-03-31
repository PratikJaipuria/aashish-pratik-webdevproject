/**
 * Created by aashi on 3/30/2017.
 */
(function (){
    angular.module('ProjectMaker')
        .controller('userLoginController', userLoginController);

    function userLoginController(userService, $location, $timeout) {

        var vm = this;
        vm.login = login;

        vm.registerUser=registerUser;

        function login(user) {

            var errors=[];
            var error='';

            if(!user){
                error="Username and password cannot be empty";
                errors.push(error);
                throwError(errors);
            }

            else{
                if(!user.username){
                    error="Username cannot be empty";
                    errors.push(error);
                }

                if(!user.password){
                    error="Password cannot be empty";
                    errors.push(error);
                }

                if(errors.length == 0){
                    var promise=userService.findUserByCredentials(user.username, user.password);
                    promise.success(function (user) {
                        $location.url("/user/"+user._id);
                    }).error(function (err) {
                        error="Invalid username or password";
                        errors.push(error);
                        throwError(errors);
                    })

                }
                else {
                    throwError(errors);
                }
            }





        }

        function registerUser(role) {
            $location.url("/register/"+role);
        }


        function throwError(errorMsg){
            vm.error=errorMsg;


            $timeout(clearError, 5000);
        }

        function clearError() {
            vm.error='';
        }


    }

})();