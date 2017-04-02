(function(){
    angular
        .module("ProjectMaker")
        .controller("restaurantOrderTrackController", restaurantOrderTrackController);

    function restaurantOrderTrackController(orderTrackService,userService, $location, $routeParams, $timeout){
        var vm =this;
        var restaurantId=$routeParams['rst'];
        vm.assignDelivery=assignDelivery;

        function init() {

            var dbNameAvail=[];
            var promise=orderTrackService.findOrdersForThisRestaurant(restaurantId);
            promise.success(function (restOrders) {
                if (restOrders.length>0){
                    console.log(restOrders);
                    vm.orders=restOrders[0].orderId;
                    console.log(vm.orders);
                    var promise=userService.findActiveDeliveryBoyByRestaurant(restaurantId);
                    promise.success(function (delBoys) {

                        for(var rec in delBoys){

                            dbNameAvail.push(delBoys[rec].firstName+' '+delBoys[rec].lastName);

                        }
                        vm.delBoys=delBoys;
                        vm.db=dbNameAvail;
                        console.log(vm.db);
                    }).error(function (err) {
                        vm.error="Unable to fetch delivery Boys";
                    })


                }

                else {
                    vm.message='No orders till now'
                }

            }).error(function (err) {
                vm.error="Unable to find orders";
            })
          }init();


        function assignDelivery (order) {


            for (var boy in vm.delBoys){
                if ((vm.delBoys[boy].firstName+' '+vm.delBoys[boy].lastName)==order.dbName){
                    order.dbId=vm.delBoys[boy]._id;
                }
            }
            console.log(order);

            var promise=orderTrackService.assignDelivery(order);
            promise.success(function (res) {
            }).error(function (err) {
                vm.error="Unable to assign "+order._id+" to "+order.dbName;
            })

        }

    }
})();



