module.exports=function(){
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({

        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: [String],
        dateCreated: {type: Date, default: Date.now},
        city: String,
        country: String,
        pin:String
    }, {collection: 'userdb'});
    // UserSchema.index( { "email": 1, "username": 1 }, { unique: true } );
    return UserSchema;
};