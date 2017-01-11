(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('gameWindow', {
            templateUrl: 'components/game-window/game-window.html',
            bindings: {},
            controller: gameWindowController
        });
    gameWindowController.$inject = ['$ngRedux'];

    function gameWindowController($ngRedux) {
        var ctrl = this;
        var store = $ngRedux;
        console.log(store.getState().store.room.currentRoom);
        ctrl.room = store.getState().store.room.currentRoom;
    }
})();