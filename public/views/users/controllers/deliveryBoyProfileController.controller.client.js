/**
 * Created by Pratik on 4/1/2017.
 */
(function (){
    angular.module('ProjectMaker')
        .controller('deliveryBoyProfileController', deliveryBoyProfileController);

    function deliveryBoyProfileController ($location, userService, $timeout, $routeParams) {

        var vm = this;
        var userId = $routeParams['uid'];
        var restaurantId = $routeParams['rst'];
        var dbId = $routeParams['dbid'];
        // var user;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;

        function init () {
            var promise=userService.findUserByID(dbId);
            promise.success(function (dbUser) {
                vm.user=dbUser;

            }).error(function (err) {

            })
        } init();


        function updateUser(dbId, user) {
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
                var promise=userService.updateUser(dbId,user);
                promise.success(function (user) {
                    vm.user=user;
                    outputMsg("SUCCESS","Profile updated successfully");
                    $location.url("/user/"+userId+"/restaurant/"+restaurantId+"/db");
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

        function deleteUser(dbId) {
            var promise=userService.deleteUser(dbId);
            promise.success(function (response) {
                $location.url("/user/"+userId+"/restaurant/"+restaurantId+"/db");
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


    }

})();