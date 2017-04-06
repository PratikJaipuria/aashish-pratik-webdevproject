(function () {
    angular
        .module("ProjectMaker")
        .controller("deliveryPersonnalOrderController", deliveryPersonnalOrderController);
    
    function deliveryPersonnalOrderController (orderTrackService,userService, $location, $routeParams, $timeout) {
        var vm = this;
        var userId=$routeParams['uid'];
        var deliveredOrders=[];
        var unDeliveredOrders=[];

        vm.orderDelivered=orderDelivered;
        vm.enableButton=enableButton;
        vm.refresh=refresh;
        vm.userId = userId;



        function init() {
            vm.orders=[];
            vm.deliveredOrders=[];
            vm.unDeliveredOrders=[];
            deliveredOrders=[];
            unDeliveredOrders=[];

           var promise= userService.getAllOrdersForThisDeliveryBoy(userId);
            promise.success(function (userAndorders) {
                    vm.orders=userAndorders.OrderId;

                    for(var o in vm.orders){
                        if(vm.orders[o].delivered){
                            deliveredOrders.push(vm.orders[o]);

                        }

                        else{
                            unDeliveredOrders.push(vm.orders[o]);
                        }
                    }

                    vm.deliveredOrders=deliveredOrders;
                    vm.unDeliveredOrders=unDeliveredOrders;

            }).error(function (err) {
                throwError("Unable to fetch your orders");
            });
        }
        init();

        function enableButton (orderId,order, prefixToID) {

            if (order.delivered==false){
                $(prefixToID + orderId).bootstrapToggle('on');
             }
             else {
                $(prefixToID + orderId).bootstrapToggle('off').bootstrapToggle('disable');
            }



        }
        
        function orderDelivered (orderId, order, prefixToOrderId) {
            console.log(orderId);


            var promise=orderTrackService.orderedDelivered(order);
            promise.success(function (res) {

                $(prefixToOrderId + orderId).bootstrapToggle('off').bootstrapToggle('disable');
                refresh();


            }).error(function (err) {
                throwError("Unable to mark the order as delivered");
            });






        }

        function refresh() {

            init();
        }

        function throwError(errorMsg){
            vm.error=errorMsg;


            $timeout(clearError, 10000);
        }

        function clearError() {
            vm.error='';
        }


        
    }
})();