(function () {
    angular
        .module("ProjectMaker")
        .controller("deliveryPersonnalOrderController", deliveryPersonnalOrderController);
    
    function deliveryPersonnalOrderController () {
        var vm = this;
        var ids = ["1","2","3"];
        vm.id=ids;


        vm.delivered=delivered;
        
        function init() {
            $('#delivery' + vm.id[0]).bootstrapToggle('on');
            $('#delivery' + vm.id[1]).bootstrapToggle('on');
            console.log('#delivery' + vm.id[0]);
        }
        init();
        
        function delivered () {
            if ('#delivery' + vm.id[0] == "#delivery0"){
                $('#delivery' + vm.id[0]).bootstrapToggle('off').bootstrapToggle('disable');
            }

            // $('#delivery-' + vm.id[0]);

            // $('#delivery-' + vm.id[1]).bootstrapToggle('off');
            // $('#delivery-' + vm.id[1]).bootstrapToggle('disable');
            // $('#deliveryStatus1').bootstrapToggle('off');
            // $('#deliveryStatus1').bootstrapToggle('disable');




        }
        
    }
})();