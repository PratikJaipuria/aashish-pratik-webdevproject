module.exports=function(app,model){
    // app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    // app.put("/api/user/:userId", updateUser);
    // app.delete("/api/user/:userId", deleteUser);
    // app.get("/api/user/:userId", findUserById);

    var UserModel = model.UserModel;

    var api={
        "createUser":createUser
    };

    return api;






    function createUser(req, res){
        var user=req.body;
        console.log(user);
        UserModel
            .createUser(user)
            .then(function (reponse) {
                UserModel.findUserByUsername(reponse.username)
                    .then(function (user) {
                        console.log(user);
                        res.json(user);
                    }, function (err) {
                        console.log(err);
                        res.sendStatus(404).send({message: err});
                    })
            }, function (err) {
                res.sendStatus(404).send({message: err});
            })

        };





};

