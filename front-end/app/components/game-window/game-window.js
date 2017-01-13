(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('gameWindow', {
            templateUrl: 'components/game-window/game-window.html',
            bindings: {},
            controller: gameWindowController
        });
    gameWindowController.$inject = ['$ngRedux', 'roomService', '$state', 'stompService', 'gameService', '$cookies'];

    function gameWindowController($ngRedux, roomService, $state, stompService, gameService, $cookies) {
        var ctrl = this;
        var store = $ngRedux;
        ctrl.startGame = startGame;
        ctrl.logOut = logOut;
        ctrl.isPaperInputAvailable = false;
        ctrl.round = 0;
        ctrl.isExplainer = false;
        ctrl.isGuesser = false;
        var unsubscribe = store.subscribe(function () {
            ctrl.room = store.getState().store.room.currentRoom;
            ctrl.player = store.getState().store.player;
            if (ctrl.room.game !== null) {
                ctrl.isExplainer = ctrl.player.id === ctrl.room.game.explainer.id;
                ctrl.isGuesser = ctrl.player.id === ctrl.room.game.guesser.id;
            }
            if (ctrl.isExplainer)
                ctrl.role = 'explain';
            else if (ctrl.isGuesser)
                ctrl.role = 'guess';
            else ctrl.role = 'wait';
        });

        function startRoundOne() {
            ctrl.isGameStarted = true;
            ctrl.isRoundOne = true;
            ctrl.isPaperInputAvailable = false;
        }

        stompService.connectToCommunicationServer(ctrl.room, function (payload) {
            console.log(payload);
            if (payload.action === 'start')
                ctrl.isPaperInputAvailable = true;
            if (payload.action === 'update') {
                ctrl.room = payload.room;
                store.dispatch({
                    type: 'ADD_PLAYER_ROOM',
                    currentRoom: payload.room
                });
            }
            if (payload.action === 'round1') {
                ctrl.round = 1;
                ctrl.game = payload.game;
                startRoundOne();
            }
            if (payload.action === 'nextTurn') {
                ctrl.room.game = payload.game;
                store.dispatch({
                    type: 'ADD_PLAYER_ROOM',
                    currentRoom: ctrl.room
                });
            }
            if (payload.action === 'round2')
                ctrl.round = 2;
        });
        // if (ctrl.player.id === null) {
        //     ctrl.player = $cookies.getObject('player');
        // }
        roomService.getRoomByPlayerId(ctrl.player, function (response) {
            var room = response.data;
            if (room) {
                store.dispatch({
                    type: 'ADD_PLAYER_ROOM',
                    currentRoom: room
                });
            }
            else {
                $state.go('homeState');
            }
        });
        function startGame() {
            gameService.startGame(ctrl.room, ctrl.player, function (response) {
                console.log(response);
            })
        }

        function logOut() {
            $cookies.remove('player');
        }
    }
})();