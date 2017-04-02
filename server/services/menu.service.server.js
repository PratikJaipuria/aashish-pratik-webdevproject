/**
 * Created by Pratik on 4/1/2017.
 */
module.exports=function(app,model){
    app.post("/api/menu", createMenu);
    app.get("/api/menu/:rst",findMenuByRestaurantId);
    app.put("/api/menuitem/:mid",updateMenuItem);
    app.put("/api/menucategory/:rst",updateMenuCategory);
    app.get("/api/menuid/:mid",findMenuById);
    app.delete('/api/menuid/:mid',deleteMenuById);
    app.delete('/api/menucategory/:cat',deleteMenuCategory);

    var MenuModel = model.MenuModel;
    var RestaurantModel = model.RestaurantModel;


    function deleteMenuCategory(req,res) {
        var catname = req.params['cat'];
        // var menu = req.body;
         console.log("SEVER",catname);
        MenuModel
            .deleteMenuCategory(catname)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.json(err);
            });
    }

    function deleteMenuById(req,res) {
        var menuid = req.params['mid'];
        MenuModel
            .deleteMenuById(menuid)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.json(err);
            })

    }


    function findMenuById(req,res) {
        var menuid = req.params['mid'];
        MenuModel
            .findMenuById(menuid)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.json(err);
            })

    }


    function updateMenuCategory(req,res) {
        var restaurantId = req.params['rst'];
        var menu = req.body;
        MenuModel
            .updateMenuCategory(restaurantId,menu)
            .then(function (response) {
                    res.json(response);
                },function (err) {
                    res.json(err);
                });
    }


    function updateMenuItem(req,res) {
        var menuId = req.params['mid'];
        var menu = req.body;
        MenuModel
            .updateMenuItem(menuId,menu)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.json(err);
            });
    }


    function findMenuByRestaurantId(req,res) {
        var restaurantId = req.params['rst'];
        MenuModel
            .findMenuByRestaurantId(restaurantId)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.json(err);
            })

    }


    function createMenu(req,res) {
        var menu = req.body;
        console.log(menu);
        MenuModel
            .createMenu(menu)
            .then(function (response) {
                MenuModel
                    .findMenu(menu)
                    .then(function (menui) {
                        console.log("find MENU",menui);
                        RestaurantModel
                            .insertMenuId(menui)
                            .then(function (result) {
                                console.log("create server res",response);
                                res.json(response);
                            },function (err) {
                                res.json(err);
                            })
                    },function (err) {
                        res.json(err);
                    })
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

};