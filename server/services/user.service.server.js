module.exports=function(app,model){
    // app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);
    app.get("/api/user/:uid", findUserById);
    app.get("/api/user",findUserByCredentials);


    var UserModel = model.UserModel;




    function findUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;

        UserModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                if(user){
                    res.json(user);
                }
                else{
                    res.sendStatus(404);
                }


                }, function (err) {

                res.sendStatus(404);
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
                 res.sendStatus(404).send(err);
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

    function updateUser (req, res) {
        var userId = req.params['uid'];
        var user=req.body;
        UserModel.updateUser(userId, user)
            .then(function (user) {

                UserModel.findUserById(userId)
                    .then(function (user) {


                        res.json(user);
                    }, function (err) {

                        res.send(err);
                    })

            }, function (err) {
                res.send(err);
            })
    }

    function deleteUser (req, res) {
        var userId = req.params['uid'];
        UserModel.deleteUser(userId)
            .then(function (response) {
                res.send(200);
            }, function (err) {
                res.send(err);
            })
    }



};

