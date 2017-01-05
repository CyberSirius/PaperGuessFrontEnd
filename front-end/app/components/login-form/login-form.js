(function () {
    'use strict';
    angular
        .module('MoviesApp')
        .component('loginForm', {
            templateUrl: 'login-form.html',
            bindings: {},
            controller: loginFormController
        });
    loginFormController.$inject = [];

    function loginFormController() {
        var ctrl = this;
    }
})();