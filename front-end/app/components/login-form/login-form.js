(function () {
    'use strict';
    angular
        .module('MoviesApp')
        .component('loginForm', {
            templateUrl: 'components/login-form/login-form.html',
            bindings: {},
            controller: loginFormController
        });
    loginFormController.$inject = [];

    function loginFormController() {
        var ctrl = this;
        ctrl.sendLoginInfo = sendLoginInfo;
        ctrl.user = {};
        function sendLoginInfo() {
            console.log(ctrl.user);
        }
    }
})();