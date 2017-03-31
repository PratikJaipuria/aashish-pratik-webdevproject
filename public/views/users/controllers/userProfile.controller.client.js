(function (){
    angular.module('ProjectMaker')
        .controller('userProfileController', userProfileController);

    function userProfileController ( $routeParams, userService, $location, $timeout) {

        var vm = this;
        var userId=$routeParams['uid'];
        vm.countries=['United States', 'Canada'];
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;

        function init () {
            var promise=userService.findUserByID(userId);
            promise.success(function (user) {
                vm.user=user;
                console.log()

            }).error(function (err) {

            })
           } init();


        function updateUser(userId, user) {
            var errors=[];
            var error='';

            if(!user.firstName){
                error="FirstName is invalid";
                errors.push(error);
            }

            if(!user.lastName){
                error="LastName is invalid";
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
                var promise=userService.updateUser(userId,user);
                promise.success(function (user) {
                    vm.user=user;
                    outputMsg("SUCCESS","Profile updated successfully");
                }).error(function (err) {
                    error="unable to update User";
                    errors.push(error);
                    outputMsg("ERROR",errors);
                })
            }
            else {
                outputMsg("ERROR",errors);
            }


        }

        function deleteUser(userId) {
            var promise=userService.deleteUser(userId);
            promise.success(function (response) {
               $location.url("/login");
            }).error(function (err) {
                vm.error("unable to delete User");
            })
        }

        function outputMsg(msgType,msg){
            if(msgType=='SUCCESS'){
                vm.message=msg;
            }
            else{
                vm.error=msg;
            }
            $timeout(clearMessage, 5000);
        }

        function clearMessage() {
            vm.error='';
            vm.message='';
        }
    };
})();

