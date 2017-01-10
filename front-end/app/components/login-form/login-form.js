(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('loginForm', {
            templateUrl: 'components/login-form/login-form.html',
            bindings: {},
            controller: loginFormController
        });
    loginFormController.$inject = ['$stomp', 'playerService', '$ngRedux'];

    function loginFormController($stomp, playerService, $ngRedux) {
        var ctrl = this;
        var store = $ngRedux;
        ctrl.sendPlayerName = sendPlayerName;
        ctrl.getPlayers = getPlayers;

        // testNgStomp();
        var unsubscribe = store.subscribe(function () {
            console.log(store.getState());
        });

        function sendPlayerName() {
            console.log(ctrl.name);
            var request = {
                "name": ctrl.name
            };
            store.dispatch({
                type: 'TEST_ACTION',
                data: ctrl.name
            });
            // console.log(playerService.sendPlayerName(request));
        }

        function getPlayers() {
            // console.log(playerService.getPlayers());
            unsubscribe();
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