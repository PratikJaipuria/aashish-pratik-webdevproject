(function (){
    angular.module('ProjectMaker')
        .controller('userRegisterController', userRegisterController);

    function userRegisterController ($location, userService, $timeout, $routeParams) {
        var vm = this;
         var role=$routeParams['role'];
        vm.countries=['United States', 'Canada'];
        vm.createUser=createUser;
        function init() {
        }init();


        function createUser (user) {
            console.log(user);


            if(user){

                    if(user.password === user.password2 && user.password){
                         createNewUser(user);
                    }else{
                        throwError('Password does not match');

                    }

            }

            else{
                throwError('Please enter details');

            }

        }



        function createNewUser(user) {
            if(role==0){
                user.role='USER';
            }
            else {
                user.role = 'OWNER';
            }

            var promise=userService.createUser(user);
            promise.success(function (user) {
                // console.log(user);
                $location.url('/user/'+user._id);
            }).error(function (err) {
                console.log(err);
                if (err==11000)
                throwError('Either this username or email already taken.');
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


