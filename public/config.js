(function(){
    angular
        .module("ProjectMaker")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        $routeProvider
            .when("/",{
                templateUrl: "views/home.html",
                controller:'homeController',
                controllerAs:'model'

            })
            .when("default",{
                templateUrl: "views/home.html",
                controller:'homeController',
                controllerAs:'model'
            })

            .when("/home",{
                templateUrl: "views/home.html",
                controller:'homeController',
                controllerAs:'model'
            })

            .when("/login",{
                templateUrl: "views/login.html"})

            .when("/searchResult/name/:rn/address/:add",{
                templateUrl: "views/user.search.result.html",
                controller: "searchResultController",
                controllerAs: "model"})


            .when("/searchResult/address/:add",{
                templateUrl: "views/user.search.result.html",
                controller: "searchResultController",
                controllerAs: "model"})


            .when("/user/:uid/searchResult/name/:rn/address/:add",{
                templateUrl: "views/user.search.result.html",
                controller: "searchResultController",
                controllerAs: "model"})


            .when("/user/:uid/searchResult/address/:add",{
                templateUrl: "views/user.search.result.html",
                controller: "searchResultController",
                controllerAs: "model"})









            .when("/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl: "views/user.restaurant.menu.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model"})


            .when("/searchResult/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl:"views/user.restaurant.menu.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model"})


            .when("/user/:uid/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl: "views/user.restaurant.menu.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model"})


            .when("/user/:uid/searchResult/address/:add/restaurant/:rid/:rname/menu",{
                templateUrl:"views/user.restaurant.menu.html",
                controller: "restaurantSearchMenuController",
                controllerAs: "model"})



            .when("/searchResult/address/:add/restaurant/:rid/:rname/menu/cart",{
                templateUrl:"views/user.checkout.html",
                controller: "checkOutController",
                controllerAs: "model"})

            .when("/searchResult/name/:rn/address/:add/restaurant/:rid/:rname/menu/cart",{
                templateUrl:"views/user.checkout.html",
                controller: "checkOutController",
                controllerAs: "model"})


            // '/user/'+userId+'/searchResult/name/'+name+'/address/'+address+'/restaurant/'+apiKey

            .when("/owner/:uid/restaurant/:rst/order",{
                templateUrl: "views/resturant.order.tracking.html"})


            // .when("/register",{
            //     templateUrl: "views/register.html"
            //     // controller: "registerController"
            // })


            .when("/register-user",{
                templateUrl: "views/userRegister.html",
                controller: "userRegisterController"
            })

            .when("/register-owner",{
                templateUrl: "views/ownerRegister.html",
                controller: "ownerRegisterController"
            })

            .when("/owner/:uid",{
                templateUrl: "views/ownerProfile.html",
                // controller: "ownerRegisterController"
            })

            .when("/user/:uid",{
                templateUrl: "views/userProfile.html",
                controller: "userProfileController",
                controllerAs: "model"
            })

            .when("/owner/:uid/restaurant/new",{
                templateUrl: "views/newRestaurant.html",
                controller: "restaurantNewController",
                controllerAs:"model"
            })

            .when("/owner/:uid/restaurant/",{
                templateUrl: "views/restaurantList.html"
                // controller: "ownerRegisterController"
            })
            .when("/owner/:uid/restaurant/:rst/menu",{
                templateUrl: "views/restaurantMenu.html",
                controller: "restaurantMenuController",
                controllerAs: "model"
            })

            .when("/owner/:uid/restaurant/:rst",{
                templateUrl: "views/restaurantEdit.html",
                controller: "restaurantEditController",
                controllerAs: "model"
            })
            .when("/owner/:uid/restaurant/:rst/menu/cat/:cat",{
                templateUrl: "views/menuCategoryEdit.html"
            })

            .when("/owner/:uid/restaurant/:rst/menu/new",{
                templateUrl: "views/newMenu.html"
                // controller: "restaurantEdit",
                // controllerAs: "model"
            })
            .when("/owner/:uid/restaurant/:rst/db",{
                templateUrl: "views/deliveryPersonnalList.html"
                // controller: "restaurantEdit",
                // controllerAs: "model"
            })
            .when("/owner/:uid/restaurant/:rst/db/new",{
                templateUrl: "views/deliveryPersonnalRegister.html"
                // controller: "restaurantEdit",
                // controllerAs: "model"
            })

            //change this to profile standard path
            .when("/owner/:uid/restaurant/:rst/db/:uid",{
                ///deliveryPersonnal/:db
                templateUrl: "views/deliveryPersonnalProfile.html"
                // controller: "restaurantEdit",
                // controllerAs: "model"
            })

            .when("/db/:uid",{
                ///deliveryPersonnal/:db
                templateUrl: "views/deliveryPersonnalProfile.html"
                // controller: "restaurantEdit",
                // controllerAs: "model"
            })

            .when("/db/:uid/order",{
                ///deliveryPersonnal/:db
                templateUrl: "views/deliveryPersonnalOrder.html",
                controller: "deliveryPersonnalOrderController",
                controllerAs: "model"
            });



    }})();