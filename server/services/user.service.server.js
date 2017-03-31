module.exports=function(app,model){
    // app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    // app.put("/api/user/:userId", updateUser);
    // app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user/:uid", findUserById);
    app.get("/api/user",findUserByCredentials);

    var UserModel = model.UserModel;




    function findUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;

        UserModel
            .findUserByCredentials(username,password)
            .then(function (user) {

                    res.json(user);

                }, function (err) {
                res.sendStatus(err);
            });
    }





    function createUser(req, res){
        var user=req.body;

        UserModel
            .createUser(user)
            .then(function (reponse) {
                UserModel.findUserByUsername(reponse.username)
                    .then(function (user) {

                        res.json(user);
                    }, function (err) {

                        res.sendStatus(err.code);
                    })
            }, function (err) {

                res.sendStatus(err.code);
            })

        };

    function findUserById(req, res) {
        var userId= req.params['uid'];

        UserModel.findUserById(userId)
            .then(function (user) {


                res.json(user);
            }, function (err) {

                res.send(err);
            })
    }





};

