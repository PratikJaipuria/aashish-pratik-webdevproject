(function (){
    angular
        .module("ProjectMaker")
        .factory("sessionHolderService",sessionHolderService);

    function sessionHolderService () {


        var api = {
            "setCart": setCart,
            "getCart":getCart
        };
        var cart;

        return api;

        function setCart(tempObj) {
            cart=tempObj;
        }

        function getCart() {
            var cartToSend=cart;
            cart='';
            return cartToSend;
        }



    }
})();