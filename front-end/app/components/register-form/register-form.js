(function () {
    'use strict';
    angular
        .module('PaperGuess')
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
        }
    }
})();