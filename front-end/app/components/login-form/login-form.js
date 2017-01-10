(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('loginForm', {
            templateUrl: 'components/login-form/login-form.html',
            bindings: {},
            controller: loginFormController
        });
    loginFormController.$inject = ['$stomp', 'playerService'];

    function loginFormController($stomp, playerService) {
        var ctrl = this;
        ctrl.sendPlayerName = sendPlayerName;
        ctrl.getPlayers = getPlayers;
        testNgStomp();
        function sendPlayerName() {
            console.log(ctrl.name);
            var request = {
                "name": ctrl.name
            };
            console.log(playerService.sendPlayerName(request));
        }

        function getPlayers() {
            console.log(playerService.getPlayers());
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