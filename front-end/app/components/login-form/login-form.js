(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('loginForm', {
            templateUrl: 'components/login-form/login-form.html',
            bindings: {},
            controller: loginFormController
        });
    loginFormController.$inject = ['$ngRedux', 'playerService', '$state', '$cookies'];

    function loginFormController($ngRedux, playerService, $state, $cookies) {
        var ctrl = this;
        var store = $ngRedux;
        ctrl.sendPlayerName = sendPlayerName;

        function sendPlayerName() {
            var request = {
                "name": ctrl.name
            };
            playerService.sendPlayerName(request, function (response) {
                store.dispatch({
                    type: 'CREATE_CURRENT_PLAYER',
                    player: response.data
                });
                $cookies.putObject('player', response.data);
                $state.go('homeState');
            });
        }
    }
})();