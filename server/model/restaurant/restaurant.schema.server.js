/**
 * Created by Pratik on 3/30/2017.
 */
module.exports=function(){
    var mongoose = require('mongoose');
    // var days=['MON', 'TUE', 'WED', 'THU','FRI','SAT','SUN'];


    var RestaurantSchema = mongoose.Schema({
        _id: {type:String, index: {unique: true}},
        name:  String,
        ownerId : String,
        menuId : [String],
        orderId:[{type: mongoose.Schema.Types.ObjectId, ref: 'OrderModel'}],
        deliveryBoysId : [String],
        phone: String,
        streetAddress: String,
        city: String,
        state:String,
        country: String,
        pin:String,
        logoUrl:String,
        timestamp:String,
        hours:{
            "Monday":[String],
            "Tuesday":[String],
            "Wednesday":[String],
            "Thursday":[String],
            "Friday":[String],
            "Saturday":[String],
            "Sunday":[String]
        },
        foodTypes:[String],
        cuisine: String,
        offersDelivery:Boolean,
        offersPickup:Boolean,
        dateCreated: {type: Date, default: Date.now},
        url: String,
        partner: {type: Boolean, default: false},
    }, {collection: 'restaurantdb'});
    // UserSchema.index( { "email": 1, "username": 1 }, { unique: true } );
    return RestaurantSchema;
};

