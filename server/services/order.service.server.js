module.exports=function(app,model){
    // app.get("/api/user", findUser);
    app.post("/api/restaurant/checkout", createOrder);
    app.get('/api/restaurant/:rst/orders', getOrdersForThisRestaurant);
    app.put('/api/restaurant/:rst/orders/delivery', assignDelivery);
    app.put('/api/restaurant/:rst/orders/markdelivered', markOrderDelivered);
    app.get("/api/user/:uid/customerOrders", getCustomerOrders);
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

        UserModel
            .findUserById(userId)
            .then(function (user) {
                order.deliverAddress=user.address+' '+user.city+' '+user.state;
                order.customerPhone=user.phone;


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
            },function (err) {
                res.sendStatus(404).send({"message":"Unable to fetch user details"});
            })



    };


    function getOrdersForThisRestaurant (req, res) {
        var rid=req.params['rst'];
        RestaurantModel.getOrdersForThisRestaurant(rid)
            .then(function (ordersList) {
                res.json(ordersList);
            }, function (err) {
                res.sendStatus(404);
            })

    }

    function assignDelivery (req, res) {
        var order=req.body;
        OrderModel.updateOrderWithDB(order)
            .then(function (response) {
               UserModel.updateDBwithOrder(order.dbId, order._id)
                   .then(function (response) {
                       res.sendStatus(200);
                   }, function (err) {
                       res.sendStatus(404);
                   })
            }, function (err) {
                res.sendStatus(404);
            })
    }

    function markOrderDelivered(req, res) {

        var order=req.body;
        OrderModel.markOrderDelivered(order)
            .then(function (response) {

                res.sendStatus(200);

            }, function (err) {
                res.sendStatus(404);
            })
    }



    function getCustomerOrders (req, res) {
        var userId=req.params['uid'];
        OrderModel.getAllOrdersForThisCustomerId(userId)
            .then(function (orders) {
                res.json(orders);
            }, function (err) {
                res.sendStatus(404);
            })
    }








};

