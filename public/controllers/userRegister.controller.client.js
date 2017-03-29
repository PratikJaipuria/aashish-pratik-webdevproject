(function (){
    angular.module('ProjectMaker')
        .controller('userRegisterController', userRegisterController);

    function userRegisterController ($location, userService, $timeout) {
        var vm = this;
        vm.viewId="userRegistration";

        vm.createUser=createUser;
        function init() {
        }init();


        function createUser (user) {
            console.log(user);
            if(user){

                    if(user.password===user.password2){
                         createNewUser(user);
                    }else{
                        throwError('Password doesnot match');

                    }

            }

            else{
                throwError('Please enter details');

            }

        }



        function createNewUser(user) {
            var promise=userService.createUser(user);
            promise.success(function (user) {
                $location.url('#/user/'+user._id);
            }).error(function (err) {
                vm.error='Unable to create new User'+ err;
            })
        }

        function throwError(errorMsg){
            vm.error=errorMsg;
            $timeout(clearError, 3000);
        }

        function clearError() {
            vm.error='';
        }

    };
})();


