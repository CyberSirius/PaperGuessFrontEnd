(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('gameWindow', {
            templateUrl: 'components/game-window/game-window.html',
            bindings: {},
            controller: gameWindowController
        });
    gameWindowController.$inject = ['$ngRedux', 'roomService', '$state', '$cookies', 'stompService', 'gameService'];

    function gameWindowController($ngRedux, roomService, $state, $cookies, stompService, gameService) {
        var ctrl = this;
        var store = $ngRedux;
        ctrl.startGame = startGame;
        ctrl.isPaperInputAvailable = false;
        ctrl.round = 0;
        ctrl.currentPlayer = store.getState().store.player;
        ctrl.room = store.getState().store.room.currentRoom;
        console.log(ctrl.room);
        function startRoundOne() {
            ctrl.isGameStarted = true;
            ctrl.isRoundOne = true;
            ctrl.isPaperInputAvailable = false;
            ctrl.isPlayerExplainer = ctrl.currentPlayer.id === ctrl.game.explainer.id;
        }

        stompService.connectToCommunicationServer(ctrl.room, function (payload) {
            console.log(payload);
            if (payload.action === 'start')
                ctrl.isPaperInputAvailable = true;
            if (payload.action === 'round1') {
                ctrl.round = 1;
                ctrl.game = payload.game;
                startRoundOne();
            }
            if (payload.action === 'round2')
                ctrl.round = 2;
        });
        // if (ctrl.currentPlayer.id === null) {
        //     ctrl.currentPlayer = $cookies.getObject('player');
        // }
        roomService.getRoomByPlayerId(ctrl.currentPlayer, function (response) {
            var room = response.data;
            if (room) {
                store.dispatch({
                    type: 'ADD_PLAYER_ROOM',
                    currentRoom: room
                });
                ctrl.room = room;
            }
            else {
                $state.go('homeState');
            }
        });
        function startGame() {
            gameService.startGame(ctrl.room, ctrl.currentPlayer, function (response) {
                console.log(response);
            })
        }
    }
})();