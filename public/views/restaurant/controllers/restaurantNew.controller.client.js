(function (){
    angular
        .module("ProjectMaker")
        .controller("restaurantNewController",restaurantNewController);

    function restaurantNewController($routeParams, restaurantService,$location, Upload, $timeout){
        var vm = this;
        var day=['Monday','Tuesday', 'Wednesday','Thursday','Friday','Saturday','Sunday'];
        vm.count=0;
        vm.hours=["HH","00","01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19", "20", "21", "22","23"];
        vm.mins=["MM","00","15","30","45"];
        vm.days=[];
        vm.city=["Boston", "Newyork"];
        vm.country=["United States"];
        vm.booleanVal=['Yes','No'];
        vm.speciality=[];
        vm.url='';



        var ownerId = $routeParams.uid;
        vm.createRestaurant = createRestaurant;
        vm.addNewSpeciality=addNewSpeciality;
        vm.deleteSpeciality=deleteSpeciality;




        function init(){
            var dayContainer=[]
              for (var w in day){
                var temp={
                    key:day[w],
                    stH:'',
                    stM:'',
                    etH:'',
                    etM:''
                };
                  dayContainer.push(temp);


            }

            vm.days=dayContainer;

        }
        init();

        function createRestaurant(newRestaurant) {
            var errors=[];
            var error='';

            if(newRestaurant){

                restaurant=formatTiming(newRestaurant);
                restaurant.foodTypes=[];
                restaurant=setFoodTypes(newRestaurant);
                restaurant=setDeliveryAndPickupFlag(newRestaurant);
                restaurant.ownerId = ownerId;

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

                    restaurantService
                        .createRestaurant(ownerId,restaurant)
                        .success(function (restaurant) {
                            $location.url("/user/"+ownerId+"/restaurant");
                        }).error(function (err) {

                    });
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


        function formatTiming(restaurant) {
            restaurant.hours={
                "Monday":[],
                "Tuesday":[],
                "Wednesday":[],
                "Thursday":[],
                "Friday":[],
                "Saturday":[],
                "Sunday":[],

            };

            console.log(vm.days);
            for(var i in vm.days){
                if(vm.days[i].selected && vm.days[i].stH !== 'HH' && vm.days[i].stM !== 'MM' && vm.days[i].etH !== 'HH' && vm.days[i].etM !== 'MM' ){
                    var formattedTime='';
                    var unit='';
                    if(vm.days[i].stH > 12){
                           formattedTime='0';
                           formattedTime+=vm.days[i].stH-12;
                           unit='PM';
                    }
                    else if(vm.days[i].stH == 0){
                        formattedTime=12;
                        unit='AM';
                    }
                    else{
                        formattedTime=vm.days[i].stH ;
                        unit='AM';
                    }
                    formattedTime+=':'+vm.days[i].stM+' '+unit+' - ' ;

                    if(vm.days[i].etH > 12){
                        formattedTime+='0';
                        formattedTime+=vm.days[i].etH-12;
                        unit='PM';
                    }
                    else if(vm.days[i].etH == 0){
                        formattedTime+=12;
                        unit='AM';
                    }
                    else{
                        formattedTime+=vm.days[i].etH ;
                        unit='AM';
                    }
                    formattedTime+=':'+vm.days[i].etM+' '+unit;

                    if(vm.days[i].key == 'Monday'){
                        restaurant.hours.Monday=[];
                        restaurant.hours.Monday.push(formattedTime);

                    }
                    if(vm.days[i].key == 'Tuesday'){
                        restaurant.hours.Tuesday=[];
                        restaurant.hours.Tuesday.push(formattedTime);

                    }
                    if(vm.days[i].key == 'Wednesday'){
                        restaurant.hours.Wednesday=[];
                        restaurant.hours.Wednesday.push(formattedTime);

                    }
                    if(vm.days[i].key == 'Thursday'){
                        restaurant.hours.Thursday=[];
                        restaurant.hours.Thursday.push(formattedTime);

                    }
                    if(vm.days[i].key == 'Friday'){
                        restaurant.hours.Friday=[];
                        restaurant.hours.Friday.push(formattedTime);

                    }
                    if(vm.days[i].key == 'Saturday'){
                        restaurant.hours.Saturday=[];
                        restaurant.hours.Saturday.push(formattedTime);

                    }
                    if(vm.days[i].key == 'Sunday'){
                        restaurant.hours.Sunday=[];
                        restaurant.hours.Sunday.push(formattedTime);

                    }

                }

            }
            return restaurant;
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