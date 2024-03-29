/**
 * Created by Pratik on 3/30/2017.
 */
module.exports=function(app,model) {

    app.post("/api/user/:userId/restaurant", createRestaurant);
    app.get("/api/user/:userId/restaurant",findRestaurantByOwner);
    app.get("/api/restaurant/:restaurantId" ,findRestaurantById);
    app.put("/api/restaurant/:restaurantId", updateRestaurant);
    app.delete("/api/restaurant/:restaurantId",deleteRestaurant );
    app.post("/api/apiresturant/create", createAPIResturantIfNotExist);
    app.get("/api/partnerRestaurant",findAllPartnerResturantsInThisLocation);

    var RestaurantModel = model.RestaurantModel;
    var UserModel = model.UserModel;
    var restaurantState=[];
    var restaurantCity;
    var stateList=["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",];
    var allResturants=[];



    function deleteRestaurant(req,res) {
        var restaurantId = req.params.restaurantId;

        RestaurantModel
            .deleteRestaurant(restaurantId)
            .then(function (response) {
                res.json(200)
            },function (err) {
                res.sendStatus(err.code);

            });
    }

    function updateRestaurant(req,res) {
        var restaurantId = req.params.restaurantId;
        var restaurant = req.body;

        RestaurantModel
            .updateRestaurant(restaurantId,restaurant)
            .then(function (response) {
                res.json(response)
            }, function (err) {
                res.sendStatus(err.code);
            });
    }


    
    
    function createRestaurant(req, res) {

            var ownerId = req.params.userId;
            var restaurant = req.body;
            restaurant.ownerId = ownerId;

            var currtime=(new Date()).getTime().toString();
            restaurant._id=currtime;
            restaurant.partner=true;

            restaurant.timestamp=currtime;

            RestaurantModel.createRestaurant(restaurant)
                .then(function (restaurant) {
                    RestaurantModel
                        .findRestaurantBytimestamp(ownerId,currtime)
                        .then(function (restaurant) {
                            UserModel.addRestaurant(ownerId,restaurant._id)
                                .then(function (response) {
                                    res.send(200);
                                }, function (err) {

                                    res.sendStatus(404).send(err);
                                })


                        },function (err) {
                            res.sendStatus(404);
                        });

                    
                }, function (err) {

                    res.sendStatus(404).send(err);
                })
    }

    function findRestaurantByOwner(req,res) {
        var ownerId = req.params.userId;

        RestaurantModel
            .findRestaurantByOwner(ownerId)
            .then(function (response) {
                res.json(response);

            },function (err){
                res.sendStatus(err.code);
            })


    }


    function findRestaurantById(req,res) {
        var restaurantId = req.params.restaurantId;

        RestaurantModel
            .findRestaurantById(restaurantId)
            .then(function (response) {
                res.json(response);

            },function (err) {
                res.sendStatus(err.code);
            });

    }

    function createAPIResturantIfNotExist(req, res) {
        var resturantDetails=req.body;

        RestaurantModel.findRestaurantById(resturantDetails._id)
            .then(function (resturantObj) {
                if(resturantObj){
                    RestaurantModel.updateRestaurant(resturantObj._id,resturantDetails)
                        .then(function (response) {
                            res.sendStatus(200);
                        },function (err) {
                            res.sendStatus(404);
                        })
                }
                else{
                    RestaurantModel.createRestaurant(resturantDetails)
                        .then(function (response) {
                            res.sendStatus(200);
                        },function (err) {
                            res.sendStatus(404);
                        })
                }

            },function (err) {
                res.sendStatus(404);
            })


    }

    function findAllPartnerResturantsInThisLocation(req, res) {
         var name = req.query.name;
         var address=req.query.address;


         var restaurants={
             name: name,
             address: address.toUpperCase()
         };

        var restQueryDetails={
            name:'',
            streetAddress:'',
            city:'',
            state:'',
            freeFormAddress:'',
            cond:''
        };

         restQueryDetails.freeFormAddress=restaurants.address;

        
         var restaurantsAddressTokens=restaurants.address.split(',');


         if(restaurants.name){

             restQueryDetails.name=restaurants.name.toUpperCase();

         }


         if(restaurantsAddressTokens.length>1){
             restQueryDetails.streetAddress=restaurantsAddressTokens[0];

             var restaurantCityAndState=restaurantsAddressTokens[1];
             setRestaurantCityAndStateToBeSearched(restaurantCityAndState,restQueryDetails);

         }

         else{

             setRestaurantCityAndStateToBeSearched(restaurantsAddressTokens[0],restQueryDetails);

         }


        allResturants=queryDBTogetPartnerResturants(restQueryDetails, res);




    }


    function setRestaurantCityAndStateToBeSearched(obj, restQueryDetails){
        var restCityAndState=obj.trim().split(' ');

        if(restCityAndState.length>1){
            
            if(ifState(restCityAndState[restCityAndState.length-1])){

                restQueryDetails.state=restCityAndState[restCityAndState.length-1];

                restCityAndState.pop();
                restQueryDetails.city=restCityAndState.toString().replace(/\s+/g,' ');

            }
            
            else{
                restQueryDetails.city=restCityAndState.toString().replace(/\s+/g,' ');

            }
            
        }

        else{

            if(ifState(restCityAndState[0])){
                restQueryDetails.state=restCityAndState[0];

            }

            else{
                restQueryDetails.city=restCityAndState[0];
            }
         
          
        }

    }

    function queryDBTogetPartnerResturants(restQueryDetails, res) {
        if(restQueryDetails.streetAddress && restQueryDetails.city && restQueryDetails.state){
            RestaurantModel
                .findAllPartnerResturantsInThisLocation(restQueryDetails)
                .then(function (response) {

                    res.json(response);


                },function (err) {

                   res.sendStatus(404);
                });
        }
        else if(restQueryDetails.city && restQueryDetails.state){

            RestaurantModel
                .findAllPartnerResturantsInThisCityAndState(restQueryDetails)
                .then(function (allResturants) {

                    res.json(allResturants);

                },function (err) {
                    res.sendStatus(404);
                });
        }
        else{
            RestaurantModel
                .findAllPartnerResturantsInThisCity(restQueryDetails)
                .then(function (allResturants) {
                    res.json(allResturants);

                },function (err) {
                    res.sendStatus(404);
                });
        }










    }
    
    function ifState(stateCandidate) {
        for (var s in stateList){
            if(stateCandidate==stateList[s]){             
                return true;
            }
        }
        return false;
    }




};
