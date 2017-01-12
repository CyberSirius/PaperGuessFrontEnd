(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('gameRoomList', {
            templateUrl: 'components/game-room-list/game-room-list.html',
            bindings: {},
            controller: gameRoomListController
        });
    gameRoomListController.$inject = ['roomService', '$ngRedux', '$state'];

    function gameRoomListController(roomService, $ngRedux, $state) {
        var ctrl = this;
        ctrl.enterRoom = enterRoom;
        var store = $ngRedux;
        ctrl.rooms = {};
        getRooms();
        var unsubscribe = store.subscribe(function () {
            ctrl.rooms = store.getState().store.room.rooms;
            ctrl.player = store.getState().store.player;
        });

        function getRooms() {
            roomService.getRooms(function (rooms) {
                store.dispatch({
                    type: 'ADD_CURRENT_ROOMS',
                    rooms: rooms
                });
                ctrl.rooms = rooms;
            })
        }

        ctrl.newRoom = {
            name: '',
            host: store.getState().store.player
        };
        function enterRoom(room) {
            roomService.logInRoom(room, store.getState().store.player, function (response) {
                store.dispatch({
                    type: 'ADD_PLAYER_ROOM',
                    currentRoom: response.data
                });
                $state.go('gameState');
            })
        }

        ctrl.createNewRoom = createNewRoom;
        function createNewRoom() {
            roomService.createNewRoom(ctrl.newRoom, function (room) {
                store.dispatch({
                    type: 'ADD_NEW_ROOM',
                    room: room
                })
            })
        }
    }
})();