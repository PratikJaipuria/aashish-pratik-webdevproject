(function(){
    angular
        .module("ProjectMaker")
        .controller("searchResultController", searchResultController);
    function searchResultController(SearchService){

        // 'use strict';
        var vm = this;
        function init() {
            // vm.websites = WebsiteService.findAllWebsitesByUser(vm.userId);
            // var data;
            // data = SearchService.searchResult();
            // data = data.replace("jsonFlickrApi(","");
            // data = data.substring(0,data.length - 1);
            // data = JSON.parse(data);

            var result = SearchService.searchResult();


             vm.restaurants = result;

        }
        init();




        // vm.searchResults = function(searchText){
        //         console.log(searchText);
        //       // curl -X GET \-H "X-Access-Token: 6fb883f6655311b6" "https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&search=boston"
        //
        //
        //      $http.get('https://api.eatstreet.com/publicapi/v1/restaurant/search-test?method=both&search=boston&street-address=316+W.+Washington+Ave.+Madison,+WI', {
        //         headers: {'Authorization': '6fb883f6655311b6'}
        //     }).success(function (data) {
        //          console.log(data);
        //      });

            // public static class EatStreetUser {
            //     public String email;
            //     public String phone;
            //     public String api_key;
            // }
            //
            // EatStreetSigninRequest signinRequest = new EatStreetSigninRequest();
            // signinRequest.email = "person@gmail.com";
            // signinRequest.password = "hunter2";
            //
            // EatStreetUser user = new Jurl()
            //     .url("https://eatstreet.com/publicapi/v1/signin")
            //     .method("POST")
            //     .header("X-Access-Token", "__API_EXPLORER_AUTH_KEY__")
            //     .bodyJson(signinRequest)
            //     .go()
            //     .getResponseJsonObject(EatStreetUser.class);

    // }




    }
})();



// curl -X GET -H "X-Access-Token: 6fb883f6655311b6" "https://api.eatstreet.com/publicapi/v1/restaurant/search-test?method=both&search=boston&street-address=boston"

// curl -X GET -H "X-Access-Token: 6fb883f6655311b6" "https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&street-address=boston"