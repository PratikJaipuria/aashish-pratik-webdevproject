(function(){
    angular
        .module("ProjectMaker")
        .controller("checkOutController", checkOutController);

    function checkOutController(checkOutService,sessionHolderService,$location, $routeParams, $timeout){


        var vm = this;
        var address=$routeParams['add'];
        var name= $routeParams['rn'];
        var restaurantId=$routeParams['rid'];
        var restaurantName=$routeParams['rname'];
        vm.backPath='';
        vm.userId=$routeParams['uid'];
        vm.restaurantName=restaurantName;
        vm.navigateToMenu=navigateToMenu;
        // vm.cart.deliverAddress='';
        var CheckOutDetails;
        var calculatedBasket;
        var cart={
            restaurantId:'',
            userId:'',
            // deliverAddress:'',
            items:[],
            totalAmount:'',
            // restLogo:'',
            restName:'',

        }



        vm.purchase=purchase;




        function init() {

            checkOutDetails=sessionHolderService.getCart();
            calculatedBasket=checkOutService.calculateTotalCost(checkOutDetails);
            vm.cart=calculatedBasket;
            vm.cart.userId=vm.userId;

        }
        init();

        function purchase() {
            cart.restaurantId=vm.cart.rId;
            cart.userId=vm.cart.userId;
            cart.totalAmount=parseInt(vm.cart.amount);
            cart.restName=restaurantName;
            cart.items=[];
            cart.restName=vm.cart.rName;
            cart.items=vm.cart.items;


            var promise=checkOutService.createOrder(cart);
            promise.success(function (order) {

                navigateToMenu();
            }).error(function (err) {
                navigateToMenu();
                outputMsg("ERROR","We are unable to process your Order currently, sorry for inconvenience");
            })
        }

        function navigateToMenu() {
            if (name && address){
                $location.url("/user/"+vm.userId+"/searchResult/name/"+name+"/address/"+address+"/restaurant/"+restaurantId+"/"+restaurantName+"/menu");
            }
            else {
                $location.url("/user/"+vm.userId+"/searchResult/address/"+address+"/restaurant/"+restaurantId+"/"+restaurantName+"/menu");
            }
        }

        function outputMsg(msgType, msg){
            if(msgType=='SUCCESS'){
                vm.message=msg;
            }
            else{
                vm.error=msg;
            }


            $timeout(clearError, 5000);
        }

        function clearError() {
            vm.error='';
            vm.message='';
        }


    }
})();



