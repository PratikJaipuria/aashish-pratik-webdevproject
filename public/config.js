(function(){
    angular
        .module("ProjectMaker")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/",{
                templateUrl: "views/home.html"

            })
            .when("default",{
                templateUrl: "views/home.html"})

            .when("/home",{
                templateUrl: "views/home.html"})

            .when("/login",{
                templateUrl: "views/login.html"})


            .when("/register",{
                templateUrl: "views/register.html"})

    }})();