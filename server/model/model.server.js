module.exports=function () {
    // var mongoose = require('mongoose');
    var model= {
        UserModel: require('./user/user.model.server')(),
        RestaurantModel: require('./restaurant/restaurant.model.server')()
        // PageModel: require('./page/page.model.server')(),
        // WidgetModel:require('./widget/widget.model.server')()
    }
    return model;
};
/**
 * Created by aashi on 3/29/2017.
 */
