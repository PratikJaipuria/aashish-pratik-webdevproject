module.exports = function () {

    var q = require('q');


    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server.js')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername
    };
    return api;

    function createUser(user) {
        var deferred=q.defer();
        console.log("MODEL USER ",user);
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


};