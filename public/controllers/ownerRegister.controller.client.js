(function (){
    angular.module('ProjectMaker')
        .controller('ownerRegisterController', ownerRegisterController);

    function ownerRegisterController () {
        var vm = this;
        vm.viewId="ownerRegistration";
    };
})();