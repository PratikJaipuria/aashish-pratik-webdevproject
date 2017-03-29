(function (){
    angular
        .module("ProjectMaker")
        .factory("checkOutService",checkOutService);

    function checkOutService () {


        var api = {
            "calculateTotalCost":calculateTotalCost
        };


        return api;

        function calculateTotalCost(cart) {
            items=cart.items;
            var totPrice;
            var amount=0;

            for (item in items){
                totPrice=items[item].basePrice * items[item].totCount;
                items[item].totPrice=totPrice;
                amount+=totPrice;
            }
            cart.items=items;
            cart.amount=amount;
            return cart;


        }
        // basePrice
        //     :
        //     3.5
        // categoryId
        //     :
        //     "5523f3ac54910ed5fdb3aba31c19a8a7344acb796c2ba6d6"
        // itemId
        //     :
        //     "7585295"
        // name
        //     :
        //     "Mango Smoothie"
        // totCount
        //     :
        //     3
    }
})();