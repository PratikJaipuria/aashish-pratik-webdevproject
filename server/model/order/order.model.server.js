module.exports=function () {

    var q = require('q');
    var mongoose = require('mongoose');

    var OrderSchema = require('./order.schema.server.js')();
    var OrderModel = mongoose.model('OrderModel', OrderSchema);

    var api = {
        createOrder: createOrder,
        getCurrentOrder: getCurrentOrder,
        markOrderDelivered: markOrderDelivered,
        // findUserByUsername: findUserByUsername,
        // findUserById:findUserById,
        // findUserByCredentials:findUserByCredentials,
           updateOrderWithDB:updateOrderWithDB,
        // deleteUser:deleteUser,
        // addRestaurant:addRestaurant

    };
    return api;


    function createOrder(order) {
        var deferred = q.defer();
        OrderModel.create(order, function (err, res) {

            if (err) {

                deferred.reject(err);
            }
            else {


                deferred.resolve(res);
            }
        })

        return deferred.promise;

    }

    function getCurrentOrder(uid, currtime) {
        var deferred = q.defer();
        OrderModel.findOne({userId: uid, timestamp: currtime}, function (err, order) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(order)
            }
        });
        return deferred.promise;
    }

    function updateOrderWithDB (order) {
        var deferred = q.defer();
        OrderModel.update({_id: order._id},{$set: {dbId: order.dbId, dbName: order.dbName, scheduled: true}}, function (err, order) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(order)
            }
        });
        return deferred.promise;
    }

    function markOrderDelivered (order) {
        var deferred = q.defer();
        OrderModel.update({_id: order._id},{$set: {delivered: true}}, function (err, order) {
            if (err) {
                console.log("***************************ERROR", err);
                deferred.reject(err);
            }
            else {
                console.log("***************************ORDER", order);
                deferred.resolve(order)
            }
        });
        return deferred.promise;
    }
}