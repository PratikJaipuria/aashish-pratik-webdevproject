(function (){
    angular
        .module("ProjectMaker")
        .controller("restaurantNewController",restaurantNewController);

    function restaurantNewController($routeParams, restaurantService,addressAPISearchService,$location, Upload, $timeout){
        var vm = this;
        vm.url='';

        var day=['Monday','Tuesday', 'Wednesday','Thursday','Friday','Saturday','Sunday'];
        vm.count=0;
        vm.hours=["HH","00","01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12","13", "14", "15", "16", "17", "18", "19", "20", "21", "22","23"];
        vm.mins=["MM","00","15","30","45"];
        vm.days=[];
        vm.country=["United States"];
        vm.booleanVal=['Yes','No'];
        vm.speciality=[];
        var ownerId = $routeParams.uid;
        vm.ownerId = ownerId;
        vm.createRestaurant = createRestaurant;
        vm.addNewSpeciality=addNewSpeciality;
        vm.deleteSpeciality=deleteSpeciality;
        vm.uploadImage=uploadImage;
        vm.loadAddressFromAPI=loadAddressFromAPI;
        vm.populateCityAndStateIfDlSel=populateCityAndStateIfDlSel;
        vm.states=["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",];





        function init(){
            var dayContainer=[]
              for (var w in day){
                var temp={
                    key:day[w],
                    stH:'',
                    stM:'',
                    etH:'',
                    etM:'',
                    bool:''
                };
                  dayContainer.push(temp);


            }

            vm.days=dayContainer;

        }
        init();


        function loadAddressFromAPI() {

            if(vm.restaurant.streetAddress){
                var formattedSpace=vm.restaurant.streetAddress.replace(/\s+/g,'+');
                var formatedSpaceAndPound=formattedSpace.replace(/#/g, '%23');

                var promise=addressAPISearchService.autoCompleteAddress(formatedSpaceAndPound);
                promise.success(function (addr) {
                    vm.addressFromAPI=addr.suggestions;

                }).error(function (err) {
                    vm.error=err;
                })
            }

        }

        function populateCityAndStateIfDlSel() {

            if (vm.addressFromAPI){
                var cityAndState=vm.addressFromAPI[0].text.split(', ')[1].split(' ');
                vm.restaurant.city=cityAndState[0];
                vm.restaurant.state=cityAndState[1];

            }

            else{
                vm.restaurant.city='';
                vm.restaurant.state='';
            }


        }




        function createRestaurant(newRestaurant) {
            var errors=[];
            var error='';

            if(newRestaurant){

                restaurant=formatTiming(newRestaurant);
                restaurant.foodTypes=[];
                restaurant=setFoodTypes(restaurant);
                restaurant=setDeliveryAndPickupFlag(restaurant);
                restaurant.ownerId = ownerId;
                restaurant.logoUrl=vm.url;

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

                if(!restaurant.streetAddress){
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

                if(!restaurant.cuisine){
                    error="Need at least one cuisine";
                    errors.push(error);
                }



                if(errors.length==0){
                    console.log(restaurant.streetAddress);
                    restaurant.name=restaurant.name.toUpperCase();
                    restaurant.streetAddress=restaurant.streetAddress.toUpperCase();
                    restaurant.city=restaurant.city.toUpperCase();

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
                        restaurant.hours.Monday.push(vm.days[i].stH);
                        restaurant.hours.Monday.push(vm.days[i].stM);
                        restaurant.hours.Monday.push(vm.days[i].etH);
                        restaurant.hours.Monday.push(vm.days[i].etM);
                        restaurant.hours.Monday.push("true");


                    }
                    if(vm.days[i].key == 'Tuesday'){
                        restaurant.hours.Tuesday=[];
                        restaurant.hours.Tuesday.push(formattedTime);
                        restaurant.hours.Tuesday.push(vm.days[i].stH);
                        restaurant.hours.Tuesday.push(vm.days[i].stM);
                        restaurant.hours.Tuesday.push(vm.days[i].etH);
                        restaurant.hours.Tuesday.push(vm.days[i].etM);
                        restaurant.hours.Tuesday.push("true");


                    }
                    if(vm.days[i].key == 'Wednesday'){
                        restaurant.hours.Wednesday=[];
                        restaurant.hours.Wednesday.push(formattedTime);
                        restaurant.hours.Wednesday.push(vm.days[i].stH);
                        restaurant.hours.Wednesday.push(vm.days[i].stM);
                        restaurant.hours.Wednesday.push(vm.days[i].etH);
                        restaurant.hours.Wednesday.push(vm.days[i].etM);
                        restaurant.hours.Wednesday.push("true");



                    }
                    if(vm.days[i].key == 'Thursday'){
                        restaurant.hours.Thursday=[];
                        restaurant.hours.Thursday.push(formattedTime);
                        restaurant.hours.Thursday.push(vm.days[i].stH);
                        restaurant.hours.Thursday.push(vm.days[i].stM);
                        restaurant.hours.Thursday.push(vm.days[i].etH);
                        restaurant.hours.Thursday.push(vm.days[i].etM);
                        restaurant.hours.Thursday.push("true");


                    }
                    if(vm.days[i].key == 'Friday'){
                        restaurant.hours.Friday=[];
                        restaurant.hours.Friday.push(formattedTime);
                        restaurant.hours.Friday.push(vm.days[i].stH);
                        restaurant.hours.Friday.push(vm.days[i].stM);
                        restaurant.hours.Friday.push(vm.days[i].etH);
                        restaurant.hours.Friday.push(vm.days[i].etM);
                        restaurant.hours.Friday.push("true");
                        restaurant.hours.Friday.push("1");
                    }
                    if(vm.days[i].key == 'Saturday'){
                        restaurant.hours.Saturday=[];
                        restaurant.hours.Saturday.push(formattedTime);
                        restaurant.hours.Saturday.push(vm.days[i].stH);
                        restaurant.hours.Saturday.push(vm.days[i].stM);
                        restaurant.hours.Saturday.push(vm.days[i].etH);
                        restaurant.hours.Saturday.push(vm.days[i].etM);
                        restaurant.hours.Saturday.push("true");

                    }
                    if(vm.days[i].key == 'Sunday'){
                        restaurant.hours.Sunday=[];
                        restaurant.hours.Sunday.push(formattedTime);
                        restaurant.hours.Sunday.push(vm.days[i].stH);
                        restaurant.hours.Sunday.push(vm.days[i].stM);
                        restaurant.hours.Sunday.push(vm.days[i].etH);
                        restaurant.hours.Sunday.push(vm.days[i].etM);
                        restaurant.hours.Sunday.push("true");


                    }

                }

            }
            console.log(restaurant);
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
            var cuisine='';
            for (var s in vm.speciality){
                restaurant.foodTypes.push(vm.speciality[s].value);
                cuisine+=vm.speciality[s].value+' ';
            }
            restaurant.cuisine=cuisine;
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
                    // console.log(vm.logoUrl);
                    // console.log(vm.url);


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
            if(restaurant.offersPickup=='Yes'){
                restaurant.offersPickup=true;
            }
            else {
                restaurant.offersPickup=false;
            }

            if(restaurant.offersDelivery=='Yes'){
                restaurant.offersDelivery=true;
            }
            else {
                restaurant.offersDelivery=false;
            }
            return restaurant;
        }

        function throwError(errorMsg){
            vm.error=errorMsg;


            $timeout(clearError, 10000);
        }

        function clearError() {
            vm.error='';
        }
        
    }
})();