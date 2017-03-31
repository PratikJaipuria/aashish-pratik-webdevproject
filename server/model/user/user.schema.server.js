module.exports=function(){
    var mongoose = require('mongoose');
    var role=['ADMIN', 'USER', 'OWNER', 'DELIVERYBOY'];

    var UserSchema = mongoose.Schema({

        username:  {type: String, index: {unique: true}},
        password: String,
        firstName: String,
        lastName: String,
        email: {type: String, index: {unique: true}},
        role:{type: String, enum: role},
        phone: String,
        address: String,
        deliverAddress: [String],
        dateCreated: {type: Date, default: Date.now},
        city: String,
        country: String,
        pin:String,
        currentOrderId: [String],
        previousOrderId: [String],
        restaurantID: [{type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantModel'}]


    }, {collection: 'userdb'});
    // UserSchema.index( { "email": 1, "username": 1 }, { unique: true } );
    return UserSchema;
};