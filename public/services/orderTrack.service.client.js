/**
 * Created by Pratik on 4/1/2017.
 */
(function (){
    angular
        .module("ProjectMaker")
        .factory("orderTrackService",orderTrackService);

    function orderTrackService ($http) {

    var api={
        "findOrdersForThisRestaurant":findOrdersForThisRestaurant,
        "assignDelivery":assignDelivery,
        "orderedDelivered":orderedDelivered
    };

    return api;



        function findOrdersForThisRestaurant(restaurantId) {
            return $http.get('/api/restaurant/'+restaurantId+'/orders');
        }


        function assignDelivery (order) {
            return $http.put('/api/restaurant/'+order.restaurantId+'/orders/delivery', order);
        }

        function orderedDelivered (order) {
            console.log("inside markorderdelivered CLIENT SERVICE");
            return $http.put('/api/restaurant/'+order.restaurantId+'/orders/markdelivered', order);
        }

    }





})();