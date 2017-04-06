/**
 * Created by Pratik on 3/31/2017.
 */
(function () {
    angular
        .module("ProjectMaker")
        .controller("restaurantListController", restaurantListController);

    function restaurantListController($routeParams, restaurantService) {
        var vm = this;

        var ownerId = $routeParams.uid;
        vm.ownerId = ownerId;

        function init() {
            restaurantService
                .findRestaurantByOwner(ownerId)
                .success(function (restaurants) {
                    vm.restaurants = restaurants;

                })
        }
        init();

    }
})();