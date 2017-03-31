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
        deleteRestaurant:deleteRestaurant


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
                url:restaurant.url
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



};

