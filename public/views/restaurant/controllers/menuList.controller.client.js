(function (){
    angular
        .module("ProjectMaker")
        .controller("restaurantMenuController",restaurantMenuController);

    function restaurantMenuController($routeParams,menuService, $location){
        var vm = this;
        var ids = ["1","2","3"];
        vm.id=ids;

        var userId = $routeParams['uid'];
        var restaurantId = $routeParams['rst'];

        vm.userId = userId;
        vm.restaurantId = restaurantId;
        var category = [{cat: '', items:[]}];
        var eachCat = {itemName: '',
                            price:0};

        function init(){
            menuService
                .findMenuByRestaurantId(restaurantId)
                .success(function (menu) {

                    var groups = {};
                    for (var i = 0; i < menu.length; i++) {
                        var groupName = menu[i].category;
                        if (!groups[groupName]) {
                            groups[groupName] = [];
                        }
                        groups[groupName].push([menu[i].itemName,menu[i].price,menu[i]._id]);
                    }
                    myArray = [];
                    for (var groupName in groups) {
                        myArray.push({group: groupName, entry: groups[groupName]});
                    }

                    vm.result = myArray;

                    console.log("MY ARRAY",myArray);
                     vm.menu = menu;


        });
        }
        init();



    }
})();