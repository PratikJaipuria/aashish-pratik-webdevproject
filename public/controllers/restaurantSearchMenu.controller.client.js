(function(){
    angular
        .module("ProjectMaker")
        .controller("restaurantSearchMenuController", restaurantSearchMenuController);
    function restaurantSearchMenuController(restaurantSearchMenuService, sessionHolderService,$location, $routeParams, $timeout){


        var vm = this;
        var address=$routeParams['add'];
        var name= $routeParams['rn'];
        var userId=$routeParams['uid'];
        var restaurantId=$routeParams['rid'];
        var restaurantName=$routeParams['rname'];
        var cart=[];
        var selItems={};
        vm.restaurantName=restaurantName;

        vm.increaseItemCount=increaseItemCount;
        vm.decreaseItemCount=decreaseItemCount;
        vm.checkOut=checkOut;

        function init() {

            searchMenuForThisRestaurant();

        }
        init();

        function searchMenuForThisRestaurant () {
            var promise = restaurantSearchMenuService.searchMenu(restaurantId);
            promise
                .success(function (response) {
                    vm.menu=response;

                }).error(function (err) {

            })
        }

        function increaseItemCount(catKey, itemKey, commCount,  itemName, price, vmCountId) {

            var flag=0;
            var count;
            for (var i in cart){
                if (cart[i].categoryId == catKey && cart[i].itemId == itemKey){
                    cart[i].totCount+=1;
                    count=cart[i].totCount;

                    flag=1;
                }

            }

            if(flag==0){
                selItems={
                    categoryId: catKey,
                    itemId: itemKey,
                    name: itemName,
                    basePrice: price,
                    totCount: 1
                }
                count=1;


                cart.push(selItems);
            }

            angular.element(document.querySelector("#count-"+itemKey)).html(count);

        }
        
        function decreaseItemCount(catKey, itemKey, commCount, name, basePrice) {

            var count;
            for (var i in cart){
                if (cart[i].categoryId == catKey && cart[i].itemId == itemKey){
                    if(cart[i].totCount >0)
                    cart[i].totCount-=1;
                    count=cart[i].totCount;

                    if(cart[i].totCount ==0){
                        cart.splice(i,1);
                        count='';

                    }
                }

            }
            angular.element(document.querySelector("#count-"+itemKey)).html(count);

        }

        function checkOut() {

            if (cart.length > 0){
                var cartDetails={
                    rId: restaurantId,
                    rName: restaurantName,
                    items:cart
                }

                sessionHolderService.setCart(cartDetails);

                if(name){
                    $location.url('/searchResult/name/'+name+'/address/'+address+'/restaurant/'+restaurantId+'/'+restaurantName+'/menu/cart');
                }
                else{
                    $location.url('/searchResult/address/'+address+'/restaurant/'+restaurantId+'/'+restaurantName+'/menu/cart');
                }
            }

            else {
                vm.error="Please select Dishes first";
                $timeout(clearError, 3000);

            }


        }

        function clearError() {
            vm.error="";
        }

    }
})();



