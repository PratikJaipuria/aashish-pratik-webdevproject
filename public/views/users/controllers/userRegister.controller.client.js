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
            var errors=[];
            var error='';

            if(!user.username){
                error="Username cannot be empty";
                errors.push(error);
            }

            if(!user.firstName){
                error="FirstName is invalid";
                errors.push(error);
            }

            if(!user.lastName){
                error="LastName is invalid";
                errors.push(error);
            }

            if(!user.email){

                error="Email is invalid";
                errors.push(error);
            }

            if(!user.phone){
                error="Phone is invalid";
                errors.push(error);
            }

            if(!user.pin){
                error="PIN is invalid";
                errors.push(error);
            }

            if(!user.address){
                error="Address is invalid";
                errors.push(error);
            }

            if(!user.city){
                error="City is invalid";
                errors.push(error);
            }


            if(errors.length == 0){

                    if(user.password === user.password2 && user.password){
                         createNewUser(user);
                    }else{
                        error='Password does not match';
                        errors.push(error);
                        throwError(errors);

                    }

            }


            else{
                throwError(errors);

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
                console.log(user);
                $location.url('/user/'+user._id);
            }).error(function (err) {
                   throwError('Either this username or email already taken.');
            })
        }

        function throwError(errorMsg){
            vm.error=errorMsg;


            $timeout(clearError, 5000);
        }

        function clearError() {
            vm.error='';
        }

    };
})();


