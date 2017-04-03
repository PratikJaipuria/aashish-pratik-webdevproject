(function () {
    angular
        .module("ProjectMaker")
        .controller("deliveryPersonnalOrderController", deliveryPersonnalOrderController);
    
    function deliveryPersonnalOrderController (orderTrackService,userService, $location, $routeParams, $timeout) {
        var vm = this;
        var userId=$routeParams['uid'];


        vm.orderDelivered=orderDelivered;
        vm.enableButton=enableButton;
        function init() {
           var promise= userService.getAllOrdersForThisDeliveryBoy(userId);
            promise.success(function (userAndorders) {
                    vm.orders=userAndorders.OrderId;
                    console.log("Orders for this guy:  ",vm.orders);
            }).error(function (err) {
                vm.error="Unable to fetch your orders";
            });
        }
        init();

        function enableButton (orderId,order) {

            if (order.delivered==false){
                $('#delivery-' + orderId).bootstrapToggle('on');
             }
             else {
                $('#delivery-' + orderId).bootstrapToggle('off').bootstrapToggle('disable');
            }



        }
        
        function orderDelivered (orderId, order) {
            console.log(orderId);


            var promise=orderTrackService.orderedDelivered(order);
            promise.success(function (res) {
                order.delivered=true;
                $('#delivery-' + orderId).bootstrapToggle('off').bootstrapToggle('disable');

            }).error(function (err) {
                vm.error="Unable to mark the order as delivered";
            });


            console.log( vm.orders);




        }
        
    }
})();