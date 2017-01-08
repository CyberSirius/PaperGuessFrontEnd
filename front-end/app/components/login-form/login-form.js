(function () {
    'use strict';
    angular
        .module('MoviesApp')
        .component('loginForm', {
            templateUrl: 'components/login-form/login-form.html',
            bindings: {},
            controller: loginFormController
        });
    loginFormController.$inject = ['$stomp'];

    function loginFormController($stomp) {
        var ctrl = this;
        ctrl.sendLoginInfo = sendLoginInfo;
        testNgStomp();
        ctrl.user = {};
        function sendLoginInfo() {
            console.log(ctrl.user);
        }

        function testNgStomp() {
            $stomp.connect('http://192.168.0.104:8080/paperguess').then(function (frame) {
                var subscription = $stomp.subscribe('/chat/bestroom', function (payload, headers, res) {
                    console.log(payload);
                    console.log(headers);
                    console.log(res);
                }, {});
            })

        }
    }
})();