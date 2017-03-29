(function(){
    angular
        .module("ProjectMaker")
        .controller("homeController", homeController);
    function homeController(SearchService, $location){


        var vm = this;
        vm.findRestaurant=findRestaurant;


        function init() {
                vm.error="";
        }
        init();

        function findRestaurant (restaurant) {
            if(restaurant){
                // var restNameLen=restaurant.name.length;
                // var restAddLen=restaurant.address.length;
                if (restaurant.name && restaurant.address){
                    $location.url('/searchResult/name/'+restaurant.name+'/address/'+restaurant.address);
                }

                else if (restaurant.address){
                    $location.url('/searchResult/address/'+restaurant.address);
                }

                else{
                    vm.error="Please enter the location.";
                }

            }
            else {
                vm.error="Please enter the location and Restaurant.";
            }



        }


    }
})();



