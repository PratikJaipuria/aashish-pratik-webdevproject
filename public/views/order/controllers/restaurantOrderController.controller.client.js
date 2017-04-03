(function(){
    angular
        .module("ProjectMaker")
        .controller("restaurantOrderTrackController", restaurantOrderTrackController);

    function restaurantOrderTrackController(orderTrackService,userService, $location, $routeParams, $timeout){
        var vm =this;
        var restaurantId=$routeParams['rst'];
        var scheduledOrder=[];
        var notScheduled=[];
        var delivered=[];
        var notDelivered=[];
        vm.scheduled=[];
        vm.notscheduled=[];
        vm.delivered=[];
        vm.notDelivered=[];
        vm.getScheduled=getScheduled;
        vm.getNotScheduled=getNotScheduled;

        vm.assignDelivery=assignDelivery;


        function init() {

            var dbNameAvail=[];
            var promise=orderTrackService.findOrdersForThisRestaurant(restaurantId);
            promise.success(function (restOrders) {
                if (restOrders.length>0){
                    console.log(restOrders);
                    vm.orders=restOrders[0].orderId;



                    for (var o in restOrders[0].orderId){
                        if(restOrders[0].orderId[o].scheduled){
                            // console.log(restOrders[0]);
                            scheduledOrder.push(restOrders[0].orderId[o]);
                        }
                        else{
                            notScheduled.push(restOrders[0].orderId[o]);
                        }

                        if(restOrders[0].orderId[o].delivery){
                            delivered.push(restOrders[0].orderId[o]);

                        }

                        else {
                            notDelivered.push(restOrders[0].orderId[o]);
                        }


                    }
                    // vm.scheduled=scheduledOrder;
                    // vm.notscheduled=notScheduled;
                    console.log("not delivered",notDelivered);
                    console.log("delivered",delivered);




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

            if(order.dbName){
                for (var boy in vm.delBoys){
                    if ((vm.delBoys[boy].firstName+' '+vm.delBoys[boy].lastName)==order.dbName){
                        order.dbId=vm.delBoys[boy]._id;
                    }
                }
                // console.log(order);

                var promise=orderTrackService.assignDelivery(order);
                promise.success(function (res) {
                  order.scheduled=true;
                }).error(function (err) {
                    vm.error="Unable to assign "+order._id+" to "+order.dbName;
                })
            }
            else {
                vm.error="select a delivery boy";
            }


        }

        function getScheduled() {

            vm.orders=scheduledOrder;
            console.log(vm.orders);
        }

        function getNotScheduled() {
            vm.orders=notScheduled;
            console.log(vm.orders);
        }

    }
})();



