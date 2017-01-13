(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('paperPieces', {
            templateUrl: 'components/paper-pieces/paper-pieces.html',
            bindings: {},
            controller: paperPiecesController
        });
    paperPiecesController.$inject = ['$ngRedux', 'paperService'];

    function paperPiecesController($ngRedux, paperService) {
        var ctrl = this;
        var store = $ngRedux;
        ctrl.counter = 0;
        ctrl.maxWords = 2;
        var unsubscribe = store.subscribe(function () {
            ctrl.room = store.getState().store.room.currentRoom;
            ctrl.player = store.getState().store.player;
        });
        ctrl.paper = {
            content: '',
            room: ctrl.room,
            player: ctrl.player
        };
        ctrl.isInputDisabled = false;
        ctrl.submitPaper = submitPaper;

        function submitPaper() {
            paperService.addNewPaper(ctrl.paper, function (response) {
                disableInput();
            })
        }

        function disableInput() {
            ctrl.counter++;
            if (ctrl.counter >= ctrl.maxWords) {
                ctrl.isInputDisabled = true;
            }
        }
    }
})();