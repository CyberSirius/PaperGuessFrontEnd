(function () {
    'use strict';
    angular
        .module('MoviesApp')
        .component('registerForm', {
            templateUrl: 'components/register-form/register-form.html',
            bindings: {},
            controller: registerFormController
        });
    registerFormController.$inject = [];

    function registerFormController() {
        var ctrl = this;
        ctrl.sendRegisterInfo = sendRegisterInfo;
        ctrl.user = {};
        function sendRegisterInfo() {
            console.log(ctrl.user);
        }
    }
})();