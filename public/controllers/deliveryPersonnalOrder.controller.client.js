(function () {
    angular
        .module("ProjectMaker")
        .controller("deliveryPersonnalOrderController", deliveryPersonnalOrderController);
    
    function deliveryPersonnalOrderController () {
        var vm = this;
        // var ids = ["1","2","3"];
        // vm.id=ids;

        var orders=[{
                        name: "abc",
                        address:"germain",
                        orderNum: 1,
                        phone: 123,
                        amount: "1000",
                        flag:0
                    },{
                        name: "def",
                        address:"huntington",
                        orderNum: 2,
                        phone: 456,
                        amount: "7000",
                        flag:0}];


        vm.delivered=delivered;
        vm.enableButton=enableButton;
        function init() {
            vm.orders=orders;
        }
        init();

        function enableButton (orderId,orderFlag) {
            // console.log( vm.orders);
            if (orderFlag==0){
                $('#delivery-' + orderId).bootstrapToggle('on');
                // for (order in vm.orders){
                //     if (vm.orders[order].orderNum == orderId){
                //         vm.orders[order].flag=1;
                //     }
                // }

            }

            // console.log(vm.orders);


        }
        
        function delivered (orderId, orderFlag) {
            console.log( vm.orders);
            $('#delivery-' + orderId).bootstrapToggle('off').bootstrapToggle('disable');

                for ( var order in vm.orders){
                    if (vm.orders[order].orderNum == orderId){
                        vm.orders[order].flag=1;
                    }
                }
            console.log( vm.orders);




        }
        
    }
})();