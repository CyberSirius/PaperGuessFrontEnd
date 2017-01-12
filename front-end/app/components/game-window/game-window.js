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
        ctrl.room = store.getState().store.room.currentRoom;
        ctrl.currentPlayer = store.getState().store.player;
        stompService.connectToCommunicationServer(ctrl.room, function (payload) {
            console.log(payload);
        });
        if (ctrl.currentPlayer.id === null) {
            ctrl.currentPlayer = $cookies.getObject('player');
        }
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
            console.log('did you call yourslef????');
            gameService.startGame(ctrl.room, ctrl.currentPlayer, function (response) {
                console.log(response);
            })
        }
    }
})();