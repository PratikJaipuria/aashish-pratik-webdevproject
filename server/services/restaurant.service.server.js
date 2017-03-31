/**
 * Created by Pratik on 3/30/2017.
 */
module.exports=function(app,model) {

    app.post("/api/user/:userId/restaurant", createRestaurant);
    app.get("/api/user/:userId/restaurant",findRestaurantByOwner);
    app.get("/api/restaurant/:restaurantId" ,findRestaurantById);
    app.put("/api/restaurant/:restaurantId", updateRestaurant);
    app.delete("/api/restaurant/:restaurantId",deleteRestaurant );


    var RestaurantModel = model.RestaurantModel;



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

    function createRestaurant(req,res) {
        var ownerId = req.params.userId;
        var restaurant = req.body;
        restaurant.ownerId = ownerId;
        RestaurantModel
            .createRestaurant(restaurant)
            .then(function (response) {
                RestaurantModel
                    .findRestaurantByName(response.name)
                    .then(function (restaurant) {
                        res.json(restaurant);
                    }, function (err) {
                        res.sendStatus(err.code);
                })
                }, function (err) {
                    res.sendStatus(err.code);
                })
    }

    function findRestaurantByOwner(req,res) {
        var ownerId = req.params.userId;
        console.log("SERVER findRestaurantByOwner", ownerId);
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
        console.log("SERVER findRestaurantById", restaurantId);
        RestaurantModel
            .findRestaurantById(restaurantId)
            .then(function (response) {
                res.json(response);

            },function (err) {
                res.sendStatus(err.code);
            });

    }



};