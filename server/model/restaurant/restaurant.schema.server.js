/**
 * Created by Pratik on 3/30/2017.
 */
module.exports=function(){
    var mongoose = require('mongoose');
    // var days=['MON', 'TUE', 'WED', 'THU','FRI','SAT','SUN'];


    var RestaurantSchema = mongoose.Schema({

        name:  {type: String, index: {unique: true}},
        ownerId : {type: mongoose.Schema.ObjectId, ref: "UserSchema"},
        menuId : [String],
        deliveryBoysId : [String],
        phone: String,
        address: String,
        city: String,
        country: String,
        pin:String,
        url:String,
        logo:String,
        hours:{
            "Monday":[String],
            "Tueday":[String],
            "Wednesday":[String],
            "Thursday":[String],
            "Friday":[String],
            "Saturday":[String],
            "Sunday":[String]
        },
        foodTypes:[String],
        delivery:Boolean,
        pickup:Boolean,
        dateCreated: {type: Date, default: Date.now},
        url: String
    }, {collection: 'restaurantdb'});
    // UserSchema.index( { "email": 1, "username": 1 }, { unique: true } );
    return RestaurantSchema;
};

