(function (){
    angular
        .module("ProjectMaker")
        .controller("restaurantNewController",restaurantNewController);

    function restaurantNewController($routeParams, $location){
        var vm = this;


        function init(){

        }
        init();


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
                        '<div class=" pull-left col-sm-4 col-xs-12" style="position: relative">' +
                        '<input type="text" ng-model="model.speciality.{{model.x}}"  name="mytext[]" class="wbdv-mar-top-5" style="color: black; width:175px; height: 40px; margin-left: 20px;"/>' +
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