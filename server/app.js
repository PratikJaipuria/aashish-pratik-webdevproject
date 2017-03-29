module.exports = function(app)
{
    var connectionString = 'mongodb://127.0.0.1:27017/OnlineRestaurant';
    var model = require("./model/model.server.js")();

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);


    require("./services/user.service.server")(app, model);
    // require('./services/website.service.server.js')(app, model);
    // require('./services/page.service.server.js')(app, model);
    // require("./services/widget.service.server.js")(app, model);
    // require("./services/imageupload.service.server")(app);



};