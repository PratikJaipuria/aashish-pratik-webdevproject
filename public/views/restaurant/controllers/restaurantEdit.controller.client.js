(function (){
    angular
        .module("ProjectMaker")
        .controller("restaurantEditController",restaurantEditController);

    function restaurantEditController($routeParams, $location,restaurantService, Upload, $timeout){
        var vm = this;
        var ownerId = $routeParams.uid;
        vm.ownerId=ownerId;
        var restaurantId = $routeParams.rst;
        vm.restaurantId=restaurantId;
        var day=['Monday','Tuesday', 'Wednesday','Thursday','Friday','Saturday','Sunday'];
        vm.hours=["HH","00","01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19", "20", "21", "22","23"];
        vm.mins=["MM","00","15","30","45"];
        vm.city=["Boston", "Newyork"];
        vm.country=["United States"];
        vm.booleanVal=['Yes','No'];
        vm.speciality=[];
        vm.days=[];
        vm.count=0;






        vm.updateRestaurant = updateRestaurant;
        vm.deleteRestaurant=deleteRestaurant;
        vm.addNewSpeciality=addNewSpeciality;
        vm.deleteSpeciality=deleteSpeciality;
        vm.uploadImage=uploadImage;


        function init() {


            restaurantService
                .findRestaurantById(restaurantId)
                .success(function (restaurant) {
                    vm.restaurant = restaurant;

                    for (var s in restaurant.foodTypes){
                        ++vm.count;
                        var newObj={
                            key:vm.count,
                            value:restaurant.foodTypes[s]
                        };
                        vm.speciality.push(newObj);

                    }


                    setDeliveryandPickupforModel();
                    vm.file=restaurant.logoUrl;
                    // setModelWorkingHours();



                }).error(function (err) {
                throwError('Unable to fetch restaurant Information');
            })
        }
        init();



        // function updateRestaurant(restaurant) {
        //     var dayContainer=[]
        //     for (var w in day){
        //         var temp={
        //             key:day[w],
        //             stH:'',
        //             stM:'',
        //             etH:'',
        //             etM:''
        //         };
        //         dayContainer.push(temp);
        //
        //
        //     }
        //
        //     vm.days=dayContainer;
        //
        // }


        function updateRestaurant(restaurant) {
            // console.log(newRestaurant);
            // console.log(";;;;;;;;;;;;;;;");
            var errors=[];
            var error='';

            if(restaurant){

                // restaurant=formatTiming(newRestaurant);
                // console.log(newRestaurant);
                // console.log(";;;;;;;;;;;;;;;");
                restaurant.foodTypes=[];
                restaurant=setFoodTypes(restaurant);
                restaurant=setDeliveryAndPickupFlag(restaurant);
                restaurant.ownerId = ownerId;
                restaurant.logoUrl=vm.url;
                // console.log(newRestaurant);
                // console.log(";;;;;;;;;;;;;;;");

                if(!restaurant.name){
                    error="Invalid Restaurant Name";
                    errors.push(error);
                }

                if(!restaurant.pin){
                    error="Invalid pin";
                    errors.push(error);
                }

                if(!restaurant.phone){
                    error="Invalid phone";
                    errors.push(error);
                }

                if(!restaurant.address){
                    error="Invalid address";
                    errors.push(error);
                }

                if(!restaurant.city){
                    error="Invalid city";
                    errors.push(error);
                }

                if(!restaurant.country){
                    error="Invalid country";
                    errors.push(error);
                }

                if(errors.length==0){
                    console.log(restaurant);
                    restaurantService
                        .updateRestaurant(restaurantId,restaurant)
                        .success(function (restaurant) {
                           $location.url("/user/"+ownerId+"/restaurant")

                        })
                }
                else {
                    throwError(errors);
                }

            }
            else{
                error="Please fill in the details";
                errors.push(error);
                throwError(errors);
            }





        }



        function deleteRestaurant () {

                var r = confirm("You really want to delete this restaurant. This cannot be undone.");
                if (r == true) {
                    restaurantService
                        .deleteRestaurant(restaurantId)
                        .success(function (response) {
                            $location.url("/user/"+ownerId+"/restaurant");
                        }).error(function (err) {
                        throwError("unable to delete the restaurant");
                    });

                }



        }

        function addNewSpeciality() {
            ++vm.count;
            var newObj={
                key:vm.count,
                value:''
            };

            vm.speciality.push(newObj);
        }

        function deleteSpeciality(speciality) {
            for (var s in vm.speciality) {
                if(vm.speciality[s].key==speciality.key){
                    vm.speciality.splice(s,1);
                }
            }
        }

        function setFoodTypes(restaurant) {
            for (var s in vm.speciality){
                restaurant.foodTypes.push(vm.speciality[s].value);
            }

            return restaurant;
        }

        function setDeliveryandPickupforModel () {
            if(vm.restaurant.pickup){
                vm.restaurant.pickup="Yes";
            }
            else {
                vm.restaurant.pickup="No";
            }

            if(vm.restaurant.delivery){
                vm.restaurant.delivery="Yes";
            }
            else {
                vm.restaurant.delivery="No";
            }

        }



        function uploadImage()
        {
            if (vm.file) {
                vm.upload(vm.file);
            }
        }


        vm.upload = function (file) {


            Upload.upload({
                url: '/api/restaurant/upload',
                data:{file:file}
            }).then(function (resp) {
                if(resp.data.error_code === 0){

                    vm.error="";
                    vm.success = 'Image successfully uploaded.';
                    vm.url = resp.data.fileUrl;



                } else {
                    vm.message="";
                    vm.error = 'An error occurred';
                }
            }, function (resp) { //catch error
                vm.message="";
                vm.error =  resp.status;
                vm.error =  'Error status: ' + resp.status;
            });
        };

        function formatTiming(restaurant) {

            for(var i in restaurant.hours){
                // console.log(restaurant.hours[i]);
                if(restaurant.hours[i].selected && restaurant.hours[i].stH !== 'HH' && restaurant.hours[i].stM !== 'MM' && restaurant.hours[i].etH !== 'HH' && restaurant.hours[i].etM !== 'MM' ){
                    var formattedTime='';
                    var unit='';
                    if(restaurant.hours[i].stH > 12){
                        formattedTime='0';
                        formattedTime+=restaurant.hours[i].stH-12;
                        unit='PM';
                    }
                    else if(restaurant.hours[i].stH == 0){
                        formattedTime=12;
                        unit='AM';
                    }
                    else{
                        formattedTime=restaurant.hours[i].stH ;
                        unit='AM';
                    }
                    formattedTime+=':'+restaurant.hours[i].stM+' '+unit+' - ' ;

                    if(restaurant.hours[i].etH > 12){
                        formattedTime+='0';
                        formattedTime+=restaurant.hours[i].etH-12;
                        unit='PM';
                    }
                    else if(restaurant.hours[i].etH == 0){
                        formattedTime+=12;
                        unit='AM';
                    }
                    else{
                        formattedTime+=restaurant.hours[i].etH ;
                        unit='AM';
                    }
                    formattedTime+=':'+restaurant.hours[i].etM+' '+unit;

                    if(restaurant.hours[i].key == 'Monday'){
                        restaurant.hours.Monday=[];
                        restaurant.hours.Monday.push(formattedTime);
                        restaurant.hours.Monday.push(restaurant.hours[i].stH);
                        restaurant.hours.Monday.push(restaurant.hours[i].stM);
                        restaurant.hours.Monday.push(restaurant.hours[i].etH);
                        restaurant.hours.Monday.push(restaurant.hours[i].etM);
                        restaurant.hours.Monday.push("true");


                    }
                    if(restaurant.hours[i].key == 'Tuesday'){
                        restaurant.hours.Tuesday=[];
                        restaurant.hours.Tuesday.push(formattedTime);
                        restaurant.hours.Tuesday.push(restaurant.hours[i].stH);
                        restaurant.hours.Tuesday.push(restaurant.hours[i].stM);
                        restaurant.hours.Tuesday.push(restaurant.hours[i].etH);
                        restaurant.hours.Tuesday.push(restaurant.hours[i].etM);
                        restaurant.hours.Tuesday.push("true");


                    }
                    if(restaurant.hours[i].key == 'Wednesday'){
                        restaurant.hours.Wednesday=[];
                        restaurant.hours.Wednesday.push(formattedTime);
                        restaurant.hours.Wednesday.push(restaurant.hours[i].stH);
                        restaurant.hours.Wednesday.push(restaurant.hours[i].stM);
                        restaurant.hours.Wednesday.push(restaurant.hours[i].etH);
                        restaurant.hours.Wednesday.push(restaurant.hours[i].etM);
                        restaurant.hours.Wednesday.push("true");



                    }
                    if(restaurant.hours[i].key == 'Thursday'){
                        restaurant.hours.Thursday=[];
                        restaurant.hours.Thursday.push(formattedTime);
                        restaurant.hours.Thursday.push(restaurant.hours[i].stH);
                        restaurant.hours.Thursday.push(restaurant.hours[i].stM);
                        restaurant.hours.Thursday.push(restaurant.hours[i].etH);
                        restaurant.hours.Thursday.push(restaurant.hours[i].etM);
                        restaurant.hours.Thursday.push("true");


                    }
                    if(restaurant.hours[i].key == 'Friday'){
                        restaurant.hours.Friday=[];
                        restaurant.hours.Friday.push(formattedTime);
                        restaurant.hours.Friday.push(restaurant.hours[i].stH);
                        restaurant.hours.Friday.push(restaurant.hours[i].stM);
                        restaurant.hours.Friday.push(restaurant.hours[i].etH);
                        restaurant.hours.Friday.push(restaurant.hours[i].etM);
                        restaurant.hours.Friday.push("true");
                        restaurant.hours.Friday.push("1");
                    }
                    if(restaurant.hours[i].key == 'Saturday'){
                        restaurant.hours.Saturday=[];
                        restaurant.hours.Saturday.push(formattedTime);
                        restaurant.hours.Saturday.push(restaurant.hours[i].stH);
                        restaurant.hours.Saturday.push(restaurant.hours[i].stM);
                        restaurant.hours.Saturday.push(restaurant.hours[i].etH);
                        restaurant.hours.Saturday.push(restaurant.hours[i].etM);
                        restaurant.hours.Saturday.push("true");

                    }
                    if(restaurant.hours[i].key == 'Sunday'){
                        restaurant.hours.Sunday=[];
                        restaurant.hours.Sunday.push(formattedTime);
                        restaurant.hours.Sunday.push(restaurant.hours[i].stH);
                        restaurant.hours.Sunday.push(restaurant.hours[i].stM);
                        restaurant.hours.Sunday.push(restaurant.hours[i].etH);
                        restaurant.hours.Sunday.push(restaurant.hours[i].etM);
                        restaurant.hours.Sunday.push("true");


                    }

                }

            }
            return restaurant;
        }

        function setDeliveryAndPickupFlag (restaurant) {
            if(restaurant.pickup=='Yes'){
                restaurant.pickup=true;
            }
            else {
                restaurant.pickup=false;
            }

            if(restaurant.delivery=='Yes'){
                restaurant.delivery=true;
            }
            else {
                restaurant.delivery=false;
            }
            return restaurant;
        }

        function throwError(errorMsg){
            vm.error=errorMsg;


            $timeout(clearError, 5000);
        }

        function clearError() {
            vm.error='';
        }


    }
})();