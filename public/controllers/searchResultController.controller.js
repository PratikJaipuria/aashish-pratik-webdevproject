(function(){
    angular
        .module("ProjectMaker")
        .controller("searchResultController", searchResultController);
    function searchResultController(SearchService, $location, $routeParams){


        var vm = this;
        var address=$routeParams['add'];
        var name= $routeParams['rn'];
        var userId=$routeParams['uid'];

        vm.search={
            name: name,
            address: address
        };

        vm.searchRestaurant=searchRestaurant;
        vm.viewMenu=viewMenu;
        function init() {

            searchRestaurant(vm.search);


        }
        init();



        function searchRestaurant(search){
            if (search.address){

                var promise = SearchService.searchRestaurant(search.name, search.address);
                promise
                    .success(function (response) {
                        console.log(response);
                        formatData(response.restaurants);

                    }).error(function (err) {
                    vm.error='Unable to find the restaurnts. Please verify your search or try again in sometime.';
                })
            }
            else{
                vm.error('Please enter location.');
            }

        }

        function formatData(restaurants) {
            var result = restaurants;
            for (var i=0; i < result.length ; i++){

                var res="";
                for(var j=0; j < result[i].foodTypes.length ; j++){
                    res = res + result[i].foodTypes[j] + " ";
                }
                result[i].cuisine = res;

            }



            vm.restaurants= result;
        }

        function viewMenu (apiKey, restName) {
            var restaurantName=restName.replace(/#/g,'-');
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
    }
})();


