(function (){
    angular.module('ProjectMaker')
        .controller('userProfileController', userProfileController);

    function userProfileController ( $routeParams, userService) {

        var vm = this;
        var userId=$routeParams['uid'];
        vm.countries=['United States', 'Canada'];

        function init () {
            var promise=userService.findUserByID(userId);
            promise.success(function (user) {
                vm.user=user;

            }).error(function (err) {

            })
           } init();



    };
})();

