module.exports = function () {

    var q = require('q');


    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserById:findUserById,
        findUserByCredentials:findUserByCredentials
    };
    return api;


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
                // console.log(err);
                deferred.reject(err);
            }
            else{
                // console.log(user);
                deferred.resolve(user);

            }
        });
        return deferred.promise;
    }


};