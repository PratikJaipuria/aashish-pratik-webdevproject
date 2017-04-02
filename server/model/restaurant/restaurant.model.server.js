/**
 * Created by Pratik on 3/30/2017.
 */
module.exports = function () {
    var q = require('q');


    var mongoose = require('mongoose');

    var RestaurantSchema = require('./restaurant.schema.server.js')();
    var RestaurantModel = mongoose.model('RestaurantModel', RestaurantSchema);

    var api = {
        createRestaurant: createRestaurant,
        findRestaurantByName: findRestaurantByName,
        findRestaurantByOwner:findRestaurantByOwner,
        findRestaurantById:findRestaurantById,
        updateRestaurant:updateRestaurant,
        deleteRestaurant:deleteRestaurant,
        addOrdertoRestaurant:addOrdertoRestaurant


    };
    return api;


    function deleteRestaurant(restaurantId) {
        var deferred = q.defer();
        RestaurantModel
            .remove({_id:restaurantId},function (err,result) {
                if(err){
                    deferred.reject()
                }else{
                    deferred.resolve(result)
                }
            });
        return deferred.promise;
    }

    function updateRestaurant(restaurantId,restaurant) {
        var deferred = q.defer();
        RestaurantModel
            .update({_id:restaurantId},{
            $set: {
                name:  restaurant.name,
                phone: restaurant.phone,
                address: restaurant.address,
                city: restaurant.city,
                country: restaurant.country,
                pin:restaurant.pin,
                url:restaurant.url,
                logoUrl: restaurant.logoUrl,
                foodTypes: restaurant.foodTypes,
                delivery: restaurant.delivery,
                pickup: restaurant.pickup
            }
            },function (err,restaurant) {
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(restaurant);
                }
            });
        return deferred.promise;
    }
    function findRestaurantById(restaurantId) {
        var deferred = q.defer();

        RestaurantModel
            .findOne({_id:restaurantId},function (err,restaurant) {
                if (err) {

                    deferred.reject();
                }else{

                    deferred.resolve(restaurant);
                }
            });
        return deferred.promise;
    }


    function findRestaurantByOwner(ownerId) {
        var deferred = q.defer();

        RestaurantModel
            .find({ownerId:ownerId},function (err,restaurants) {
                if(err){
                    deferred.reject()
                }else{
                    deferred.resolve(restaurants)
                }

            });
        return deferred.promise;

    }

    function createRestaurant(restaurant) {
        var deferred=q.defer();


        RestaurantModel.create(restaurant, function (err, restaurant) {
            if(err){
                deferred.reject(err);

            }
            else{

                deferred.resolve(restaurant);
            }
        });
        return deferred.promise;
    }

    function findRestaurantByName(name){
        var deferred=q.defer();
        RestaurantModel.findOne({name: name}, function (err, restaurant) {
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(restaurant);
            }
        });
        return deferred.promise;
    }


    function addOrdertoRestaurant(resId, order) {

        var deferred=q.defer();
        RestaurantModel.update({_id: resId},{$set: { name: order.restName}, $push: {orderId: order._id}},{upsert: true},function (err, restaurant) {
                    if(err){

                        deferred.reject(err);
                    }
                    else{


                        deferred.resolve(restaurant);
                    }})

        return deferred.promise;
        }


    }













    // function addOrdertoRestaurant(resId, order) {
    //     console.log("RES ID: ",resId);
    //     console.log(order);
    //     // console.log(err);
    //     var deferred=q.defer();
    //     RestaurantModel.findOne({_id: resId},function (err, restaurant) {
    //         if(err){
    //             console.log("this is findOne error", err);
    //             deferred.reject(err);
    //         }
    //
    //         else{
    //             if(restaurant == null){
    //                 console.log("I am NULL");
    //                 RestaurantModel.update({_id: resId},{$set: { name: order.restName}, $push: {orderId: order._id}},{upsert: true},function (err, restaurant) {
    //                     if(err){
    //                     console.log("I am from upsert error:  ", err);
    //                     deferred.reject(err);
    //                     }
    //                     else{
    //
    //                         console.log("created new:  ", restaurant);
    //                         deferred.resolve(restaurant);
    //                     }})}
    //                 else{
    //                     RestaurantModel.update({_id: resId}, {$push: {orderId: order._id}}, function (err, restaurant) {
    //                         if(err){
    //                         console.log("I am available but wont help u", err);
    //                         deferred.reject(err);
    //                         }
    //                         else{
    //
    //                             console.log("upadated Old:  ", restaurant);
    //                             deferred.resolve(restaurant);
    //                         }
    //                     }
    //                     )
    //                 }
    //
    //                 }
    //
    //
    //     });
    //     return deferred.promise;
    //
    // }

    // RestaurantModel.update({_id: resId},{$set: {name: order.restName, orderId: order._id}},{upsert: true}



