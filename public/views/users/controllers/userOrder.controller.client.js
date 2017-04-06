(function (){
    angular.module('ProjectMaker')
        .controller('userOrderController', userOrderController);

    function userOrderController ( $routeParams, userService, $location) {

        var vm = this;
        var userId=$routeParams['uid'];
        vm.userId=userId;

        vm.refresh=refresh;

        function init () {
            vm.orders=[];

            var promise=userService.findAllOrdersForThisCustomer(userId);
            promise.success(function (orderList) {
                vm.orders=orderList;
                filterDeliveredandUnDeliverdOrders(vm.orders);


            }).error(function (err) {
                throwError("Unable to fetch your orders");
            })
        } init();

        function filterDeliveredandUnDeliverdOrders(orders) {
            var deliveredOrders=[];
            var notDelivered=[];
            vm.delivered=[];
            vm.notDelivered=[];


            for(var o in orders){
                if (orders[o].delivered){
                    deliveredOrders.push(orders[o]);
                }

                else{
                    notDelivered.push(orders[o]);
                }


            }

            vm.delivered=deliveredOrders;
            vm.notDelivered=notDelivered;

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



    };
})();

