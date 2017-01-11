(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('loginForm', {
            templateUrl: 'components/login-form/login-form.html',
            bindings: {},
            controller: loginFormController
        });
    loginFormController.$inject = ['$stomp', 'roomService', '$ngRedux', 'playerService', '$state'];

    function loginFormController($stomp, roomService, $ngRedux, playerService, $state) {
        var ctrl = this;
        var store = $ngRedux;
        ctrl.sendPlayerName = sendPlayerName;
        testNgStomp();
        var unsubscribe = store.subscribe(function () {
            console.log(store.getState());
        });

        function sendPlayerName() {
            console.log(ctrl.name);
            var request = {
                "name": ctrl.name
            };
            playerService.sendPlayerName(request, function (response) {
                store.dispatch({
                    type: 'CREATE_CURRENT_PLAYER',
                    player: response.data
                });
                $state.go('homeState');
            });
        }

        // function getPlayers() {
        //     // console.log(playerService.getPlayers());
        //     unsubscribe();
        // }

        function testNgStomp() {
            $stomp.connect('http://192.168.0.101:8080/paperguess').then(function (frame) {
                var subscription = $stomp.subscribe('/chat/fa361cd1-41a9-48be-a3c7-20941280ab94', function (payload, headers, res) {
                    console.log(payload);
                    console.log(headers);
                    console.log(res);
                }, {});
            })

        }
    }
})();