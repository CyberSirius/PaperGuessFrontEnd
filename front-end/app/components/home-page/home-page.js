(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('homePage', {
            templateUrl: 'components/home-page/home-page.html',
            bindings: {},
            controller: homePageController
        });
    homePageController.$inject = ['$mdDialog', 'roomService', '$ngRedux', '$cookies', '$state'];

    function homePageController($mdDialog, roomService, $ngRedux, $cookies, $state) {
        var ctrl = this;
        var store = $ngRedux;
        ctrl.clickAddNewRoom = clickAddNewRoom;
        ctrl.newRoom = {
            name: '',
            host: store.getState().store.player
        };
        if ($cookies.getObject('player')) {
            ctrl.newRoom.host = $cookies.getObject('player');
            console.log(ctrl.newRoom);
        }

        function clickAddNewRoom(event) {
            var confirm = $mdDialog.prompt()
                .title('Create new room')
                .textContent("What's the name of the room?")
                .placeholder('Room name')
                .ariaLabel('Room name')
                .targetEvent(event)
                .ok('Okay!')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function (result) {
                createNewRoom(result);
            }, function () {
            })
        }

        function createNewRoom(roomName) {
            ctrl.newRoom.name = roomName;
            roomService.createNewRoom(ctrl.newRoom, function (room) {
                store.dispatch({
                    type: 'ADD_NEW_ROOM',
                    room: room
                });
                store.dispatch({
                    type: 'ADD_PLAYER_ROOM',
                    currentRoom: room
                });
                $state.go('gameState');
            })
        }

    }
})();