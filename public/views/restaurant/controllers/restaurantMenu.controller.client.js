(function (){
    angular
        .module("ProjectMaker")
        .controller("restaurantMenuController",restaurantMenuController);

    function restaurantMenuController($routeParams, $location){
        var vm = this;
        var ids = ["1","2","3"];
        vm.id=ids;

        function init(){

        }
        init();


    }
})();