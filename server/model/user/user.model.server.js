module.exports = function () {

    var q = require('q');


    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserById:findUserById,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        deleteUser:deleteUser,
        addRestaurant:addRestaurant,
        addOrdertoCustomer:addOrdertoCustomer,
        findUserByDeliveryboy:findUserByDeliveryboy,
        updateAvailabiltyofDB:updateAvailabiltyofDB,
        updateDBwithOrder:updateDBwithOrder,
        getOrders:getOrders



    };
    return api;



    function updateAvailabiltyofDB(userId,user) {
        var deferred = q.defer();

        UserModel
            .update({_id:userId},{
                $set: {db_avail:user.db_avail}},function (err,response) {
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(response);
                }
            });

        return deferred.promise;
    }


    function findUserByDeliveryboy(users) {
        var deferred = q.defer();

        UserModel.find({_id: {$in: users}}, function (err, listUser) {
            if (err){
                deferred.reject();
            }else{
                // console.log("MODEL delivery boy",listUser);
                deferred.resolve(listUser);

            }
        });

        return deferred.promise;
    }




    function findUserByCredentials(username,password) {
        var deferred=q.defer();


        UserModel
            .findOne({
                username:username,
                password:password
            },function (err,user) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(user);
            }



            });
        return deferred.promise;
    }


    function createUser(user) {
        var deferred=q.defer();

        UserModel.create(user, function (err, user) {
            if(err){
                deferred.reject(err);

            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }


    function findUserByUsername(username){
        var deferred=q.defer();
        UserModel.findOne({username: username}, function (err, user) {
            if(err){
                deferred.reject(err);

            }
            else{
                deferred.resolve(user);
            }

        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred=q.defer();

        UserModel.findOne({_id:userId}, function (err, user) {
            if(err){

                deferred.reject(err);
            }
            else{

                deferred.resolve(user);

            }
        });
        return deferred.promise;
    }

    function updateUser (userId,user) {

        var deferred=q.defer();
        UserModel.update({_id: userId},{$set: {password:user.password, firstName:user.firstName, lastName:user.lastName,
                                                email:user.email, phone: user.phone, address: user.address, deliverAddress:user.deliverAddress,
                                                city: user.city, country: user.country, pin: user.pin }},function (err, response) {
                if(err){

                    deferred.reject(err);
                }
                else {
                      deferred.resolve(response);

                }
        })

        return deferred.promise;


    }

    function deleteUser(userId) {
        var deferred=q.defer();
        UserModel.remove({_id:userId}, function (err, response) {
            if(err){

                deferred.reject(err);
            }
            else {
                deferred.resolve(response);

            }
        })
        return deferred.promise;
    }

    function addRestaurant(ownerId, restaurantId) {
        var deferred=q.defer();
        UserModel.update({_id:ownerId}, {$push: {restaurantID: restaurantId}}, function (err, response) {
            if(err){

                deferred.reject(err);
            }
            else {
                deferred.resolve(response);

            }
        })
        return deferred.promise;
    }

    function addOrdertoCustomer(userId, oId) {
        var deferred=q.defer();
        UserModel.update({_id: userId},{$push: {OrderId: oId}}, function (err,res) {
            if(err){
                console.log(err);
                deferred.reject();
            }
            else {
                console.log(res);
                deferred.resolve(res);

            }
        })
        return deferred.promise;
    }

    function updateDBwithOrder (delBoyId, orderId) {
        var deferred=q.defer();
        UserModel.update({_id: delBoyId},{$push: {OrderId: orderId}}, function (err,res) {
            if(err){

                deferred.reject();
            }
            else {

                deferred.resolve(res);

            }
        })
        return deferred.promise;
    }

    function getOrders(userId) {
        var deferred=q.defer();
        UserModel.findOne({_id: userId}).populate("OrderId")
            .exec(function (err, userAndOrder) {
                if(err){
                    deferred.reject(err);

                }
                else{
                    deferred.resolve(userAndOrder);
                }
            });
        return deferred.promise;
    }

};