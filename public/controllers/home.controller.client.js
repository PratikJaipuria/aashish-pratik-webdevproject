(function(){
    angular
        .module("ProjectMaker")
        .controller("homeController", homeController);
    function homeController(SearchService, $location, $routeParams){


        var vm = this;
        vm.findRestaurant=findRestaurant;
        var userId=$routeParams['uid'];

        function init() {
                vm.error="";
        }
        init();
        //restaurant -> searchObject
        function findRestaurant (restaurant) {
            if(restaurant) {


                if (userId && restaurant.name && restaurant.city && restaurant.address) {
                    restaurant.address += restaurant.city
                    $location.url('/user/' + userId + '/searchResult/name/' + restaurant.name + '/address/' + restaurant.address);
                }

                else if (userId && restaurant.city && restaurant.name) {
                    $location.url('/user/' + userId + '/searchResult/name/' + restaurant.name + '/address/' + restaurant.city);

                }

                else if (userId && restaurant.city) {

                    $location.url('/user/' + userId + '/searchResult/address/' + restaurant.city);
                }

                else if (userId && restaurant.address && restaurant.name) {
                    $location.url('/user/' + userId + '/searchResult/name/' + restaurant.name + '/address/' + restaurant.address);
                }

                else if (userId && restaurant.address) {
                    $location.url('/user/' + userId + '/searchResult/address/' + restaurant.address);
                }



                else if (restaurant.name && restaurant.city && restaurant.address){
                    restaurant.address+=restaurant.city
                    $location.url('/searchResult/name/'+restaurant.name+'/address/'+restaurant.address);
                }

                else if (restaurant.city && restaurant.name){
                    $location.url('/searchResult/name/'+restaurant.name+'/address/'+restaurant.city);

                }

                else if(restaurant.city){

                    $location.url('/searchResult/address/'+restaurant.city);
                }

                else if(restaurant.address && restaurant.name){
                    $location.url('/searchResult/name/'+restaurant.name+'/address/'+restaurant.address);
                }

                else if(restaurant.address){
                    $location.url('/searchResult/address/'+restaurant.address);
                }


                else {
                    vm.error = "Please enter the City.";
                }




            }
            else {
                vm.error="Please enter the City and Restaurant.";
            }



        }


    }
})();



