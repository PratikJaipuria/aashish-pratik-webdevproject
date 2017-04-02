(function (){
    angular
        .module("ProjectMaker")
        .controller("newMenuController",newMenuController);

    function newMenuController($routeParams,menuService, $location){
        var vm = this;
        var userId = $routeParams['uid'];
        var restaurantId = $routeParams['rst'];
        var menu;
        vm.menu='';
        vm.createMenu = createMenu;

        function init() {

            console.log(restaurantId);
        }
        init();

        function createMenu(menu) {
            menu.restaurantId = restaurantId;
            console.log(menu);
            menu.restaurantId = restaurantId;
            menuService
                .createMenu(menu)
                .success(function (res) {
                    $location.url("/user/"+userId+"/restaurant/"+restaurantId+"/menu");
                }).error(function (err) {
                // throwError(errors);
            });

    }
}})();
