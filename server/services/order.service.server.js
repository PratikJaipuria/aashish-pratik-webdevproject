module.exports=function(app,model){
    // app.get("/api/user", findUser);
    app.post("/api/restaurant/checkout", createOrder);
    // app.put("/api/restaurant/customerOrder", addOrderToCustomer);
    // app.delete("/api/user/:uid", deleteUser);
    // app.get("/api/user/:uid", findUserById);
    // app.get("/api/user",findUserByCredentials);


    var OrderModel = model.OrderModel;
    var UserModel = model.UserModel;
    var RestaurantModel = model.RestaurantModel;



    function createOrder(req, res){
        var order=req.body;

        var userId=order.userId;
        var resId=order.restaurantId;
        var currtime=(new Date()).getTime().toString();
        order.timestamp=currtime;

        OrderModel
            .createOrder(order)
            .then(function (reponse) {
                OrderModel.getCurrentOrder (userId,currtime)
                    .then(function(order){
                        UserModel.addOrdertoCustomer(userId, order._id)
                            .then(function (response) {

                                RestaurantModel.addOrdertoRestaurant(resId, order)
                                    .then(function (response) {
                                        res.sendStatus(200);

                                    }, function (err) {

                                        res.sendStatus(404).send({"message":"Unable to update order in restaurant"});
                                    })

                            }, function (err) {

                                res.sendStatus(404).send({"message":"Unable to update order in Customer"});
                            })
                    }, function(err){

                        res.sendStatus(404).send({"message":"Unable to fetch orderId"});
                    })
                }, function (err) {

                res.sendStatus(404).send({"message":"Unable to createOrder"});
            })

    };








};

