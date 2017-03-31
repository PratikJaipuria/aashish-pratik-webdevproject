(function (){
    angular
        .module("ProjectMaker")
        .controller("restaurantEditController",restaurantEditController);

    function restaurantEditController($routeParams, $location,restaurantService){
        var vm = this;
        var ownerId = $routeParams.uid;
        var restaurantId = $routeParams.rst;
        vm.updateRestaurant = updateRestaurant;
        vm.deleteRestaurant=deleteRestaurant;

        function init(){
            function init() {
                restaurantService
                    .findRestaurantById(restaurantId)
                    .success(function (restaurant) {
                        vm.restaurant = restaurant;
                        console.log("EDIT controller",restaurant);
                    })
            }
            init();

        }
        init();


        function updateRestaurant(restaurant) {
            console.log("update controller",restaurant);
            restaurantService
                .updateRestaurant(restaurantId,restaurant)
                .success(function (restaurant) {
                    vm.restaurant = restaurant;
                })
        }



        function deleteRestaurant (restaurant) {


                var r = confirm("You really want to delete this restaurant. This cannot be undone.");
                if (r == true) {
                    restaurantService
                        .deleteRestaurant(restaurant._id)
                        .success(function (response) {
                        });
                    $location.url("/user/"+ownerId+"/restaurant");
                }
              // else {
                //
                // }



        }

        $(document).ready(function() {
            var max_fields      = 6; //maximum input boxes allowed
            var wrapper         = $(".input_fields_wrap"); //Fields wrapper
            var add_button      = $(".add_field_button"); //Add button ID

            vm.speciality='';
            vm.x=0;//initlal text box count
            $(add_button).click(function(e){ //on add input button click
                e.preventDefault();
                console.log(vm.speciality);
                if(vm.x < max_fields){ //max input box allowed
                    vm.x++; //text box increment
                    $(wrapper).append('' +
                        '<div class="pull-left col-sm-4 col-xs-12" style="position: relative">' +
                        '<input type="text" ng-model="model.speciality.{{model.x}}"  class="wbdv-mar-top-5" style="color: black; width:175px; height: 40px; margin-left: 20px;"/>' +
                        '<a href="#" class="wbdv-toolbar"><span class="glyphicon glyphicon-remove-circle remove_field" ' +
                        'style="height: 10px; color: black;"></span></a>' +
                        '</div>'); //add input box
                }
            });

            $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
                e.preventDefault(); $(this).closest('div').remove(); vm.x--;
            })
        });

    }
})();