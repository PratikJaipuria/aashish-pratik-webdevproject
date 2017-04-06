(function(){
    angular
        .module("ProjectMaker")
        .controller("homeController", homeController);
    function homeController(SearchService, $location, $routeParams, addressAPISearchService){


        var vm = this;

        var userId=$routeParams['uid'];


        vm.findRestaurant=findRestaurant;
        vm.loadAddressFromAPI=loadAddressFromAPI;

        vm.userLoggedIn = false;
        vm.userLoggedOut = true;
        function init() {
                vm.error="";
                CheckLoggedIn();

        }
        init();
        //restaurant -> searchObject

        function CheckLoggedIn() {
            if(userId){
                vm.userId = userId;
                vm.userLoggedIn = true;
                vm.userLoggedOut = false;
            }else{
                vm.userLoggedIn = false;
                vm.userLoggedOut = true;
            }
        }



        function loadAddressFromAPI(addressTextSoFar) {
            var formattedSpace=vm.search.address.replace(/\s+/g,'+');
            var formatedSpaceAndPound=formattedSpace.replace(/#/g, '%23');

            var promise=addressAPISearchService.autoCompleteAddress(formatedSpaceAndPound);
            promise.success(function (addr) {
                vm.addressFromAPI=addr.suggestions;

            }).error(function (err) {
                vm.error=err;
            })

        }




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

                else if(restaurant.address && restaurant.name){
                    $location.url('/searchResult/name/'+restaurant.name+'/address/'+restaurant.address);
                }


                else if(restaurant.address){
                    $location.url('/searchResult/address/'+restaurant.address);
                }


                else if(restaurant.city){

                    $location.url('/searchResult/address/'+restaurant.city);
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



