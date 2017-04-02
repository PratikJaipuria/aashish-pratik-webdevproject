(function (){
    angular.module('ProjectMaker')
        .controller('userProfileController', userProfileController);

    function userProfileController ( $routeParams, userService, $location, $timeout) {

        var vm = this;
        var userId=$routeParams['uid'];
        vm.countries=['United States', 'Canada'];
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.userId=userId;
        vm.available=available;

        function init () {
            var promise=userService.findUserByID(userId);
            promise.success(function (user) {
                vm.user=user;
                if(user.role=='DELIVERYBOY'){
                    currentAvailability();
                }
                // console.log()

            }).error(function (err) {

            })
           } init();


        function currentAvailability() {
            var curr_status=vm.user.db_avail;
            if(curr_status){
                $('#delBoyAvail').bootstrapToggle('on');

            }
            else{
                $('#delBoyAvail').bootstrapToggle('off');
            }
        }

        function available() {
            console.log(vm.user.db_avail);
            var val = vm.user.db_avail;
            console.log(val);
            var num;

            if(val){
                num = 1;
            }else{
                num = 0;
            }

            if (vm.user.db_avail){
                $('#delBoyAvail').bootstrapToggle('off');
                vm.user.db_avail=0;

                var promise=userService.updateAvailabiltyofDB(userId,vm.user);
                promise.success(function (response) {
                    // vm.user.db_avail = response;

                }).error(function (err) {
                    // error="unable to update User";
                    // errors.push(error);
                    // outputMsg("ERROR",errors);
                });
                //send to db with false
            } else{
                $('#delBoyAvail').bootstrapToggle('on');
                vm.user.db_avail=1;
                //send to db with true
                var promise=userService.updateAvailabiltyofDB(userId,vm.user);
                promise.success(function (response) {
                    // vm.user.db_avail=response;
                    // console.log("SUCCESS",vm.user.db_avail);
                }).error(function (err) {
                    // error="unable to update User";
                    // errors.push(error);
                    // outputMsg("ERROR",errors);
                });

            }
        }


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

