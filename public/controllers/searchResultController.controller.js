(function(){
    angular
        .module("ProjectMaker")
        .controller("searchResultController", searchResultController);
    function searchResultController(menuService, SearchService,restaurantService,addressAPISearchService, $location, $routeParams, $timeout){


        var vm = this;
        var address=$routeParams['add'];
        var name= $routeParams['rn'];
        var userId=$routeParams['uid'];
        var allResturants=[];
        var apiResturants=[];
        vm.restaurants=[];
        vm.restaurantFound=false;


        vm.search={
            name: name,
            address: address
        };


        //searchRestaurant takes care of modified query
        vm.searchRestaurant=searchRestaurant;

        vm.viewMenu=viewMenu;

        vm.navigateToProfile=navigateToProfile;


        vm.fetchPartnerResturants=fetchPartnerResturants;
        vm.loadAddressFromAPI=loadAddressFromAPI;

        function init() {


            fetchPartnerResturants(vm.search);
            searchAPIRestaurants(vm.search);

            // console.log(vm.restaurants);



            $(document).ready(function () {
                setTimeout(function () {
                    $('#mainCOntainer').show(500);
                }, 2000);
            })






        }
        init();

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




        function searchRestaurant(searchRestaurants){

            if(searchRestaurants.address){
                var refToNewResturant=[];
                var tokensWithoutNamereference=$location.url().split('/name/');
                if(tokensWithoutNamereference.length>1){
                    if (searchRestaurants.name){
                        refToNewResturant=tokensWithoutNamereference[0]+'/name/'+searchRestaurants.name+'/address/'+searchRestaurants.address;
                    }
                    else{
                        refToNewResturant=tokensWithoutNamereference[0]+'/address/'+searchRestaurants.address;
                    }
                }

                else{
                    var tokensWithoutAddressreference= $location.url().split('/address/');
                    if (searchRestaurants.name){
                        refToNewResturant=tokensWithoutAddressreference[0]+'/name/'+searchRestaurants.name+'/address/'+searchRestaurants.address;
                    }
                    else{
                        refToNewResturant=tokensWithoutAddressreference[0]+'/address/'+searchRestaurants.address;
                    }
                }

                $location.url(refToNewResturant);
            }

            else{
                throwError("Location field cannot be blank");
            }



        }




        function fetchPartnerResturants(search) {

            var promise=restaurantService.findAllPartnerResturantsInThisLocation(search);
            promise.success(function (partnerResturantsList) {

                allResturants=partnerResturantsList;



            }).error(function (err) {

            })


        }


        function searchAPIRestaurants(search) {
            if (search.address){

                var promise = SearchService.searchRestaurant(search.name, search.address);
                promise
                    .success(function (response) {

                        formatData(response.restaurants);

                    }).error(function (err) {

                    // $location.url("/");
                })
            }
            else{
                throwError('Please enter location.');
                // $location.url("/");
            }
        }




        function formatData(restaurants) {
            apiResturants = restaurants;
            for (var i=0; i < apiResturants.length ; i++){

                var res="";
                for(var j=0; j < apiResturants[i].foodTypes.length ; j++){
                    res = res + apiResturants[i].foodTypes[j] + " ";
                }
                apiResturants[i].cuisine = res;
            }

            for (var i in apiResturants){
                allResturants.push(apiResturants[i]);

            }
             vm.restaurants= allResturants;

            if (vm.restaurants.length == 0){
                vm.restaurantFound=false;
            }
            else{
                vm.restaurantFound=true;
            }




        }

        function viewMenu (apiKey, resturantObject) {
            var restaurantName=resturantObject.name.replace(/#/g,'-');

            var resturantDetails={
                _id:apiKey,
                name:restaurantName,
                logoUrl: resturantObject.logoUrl,
                streetAddress:resturantObject.streetAddress,
                city:resturantObject.city,
                state:resturantObject.state,
                country:resturantObject.country,
                offersDelivery: resturantObject.offersDelivery,
                offersPickup:resturantObject.offersPickup

            };



            if(resturantObject.partner){
                if(userId && name){
                    $location.url('/user/'+userId+'/searchResult/name/'+name+'/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                }
                else if(userId){
                    $location.url('/user/'+userId+'/searchResult/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                }
                else if(name && address){
                    $location.url('/searchResult/name/'+name+'/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                }

                else{
                    $location.url('/searchResult/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                }
            }
            else{

                var promise=restaurantService.createAPIResturantIfNotExist(resturantDetails);
                promise.success(function (resp) {



                    if(userId && name){
                        $location.url('/user/'+userId+'/searchResult/name/'+name+'/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                    }
                    else if(userId){
                        $location.url('/user/'+userId+'/searchResult/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                    }
                    else if(name && address){
                        $location.url('/searchResult/name/'+name+'/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                    }

                    else{
                        $location.url('/searchResult/address/'+address+'/restaurant/'+apiKey+'/'+restaurantName+'/menu');
                    }

                }).error(function (err) {

                    throwError("We are unable to fetch Menu for this restaurant right now");
                })




            }




        }




        function navigateToProfile() {
            if (userId){
                $location.url("/user/"+userId);
            }
            else{
                $location.url("/login");
            }
        }

        function throwError(errorMsg){
            vm.error=errorMsg;


            $timeout(clearError,5000);
        }

        function clearError() {
            vm.error='';
        }
    }
})();



