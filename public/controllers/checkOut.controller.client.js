(function(){
    angular
        .module("ProjectMaker")
        .controller("checkOutController", checkOutController);

    function checkOutController(checkOutService,sessionHolderService,$location, $routeParams){


        var vm = this;
        var address=$routeParams['add'];
        var name= $routeParams['rn'];
        // var userId=$routeParams['uid'];
        var restaurantId=$routeParams['rid'];
        var restaurantName=$routeParams['rname'];

        vm.restaurantName=restaurantName;

        var CheckOutDetails;
        var calculatedBasket;




        function init() {

            checkOutDetails=sessionHolderService.getCart();
            calculatedBasket=checkOutService.calculateTotalCost(checkOutDetails);
            vm.cart=calculatedBasket;

        }
        init();




    }
})();



