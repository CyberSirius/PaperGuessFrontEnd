(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('paperValue', {
            templateUrl: 'components/paper-value/paper-value.html',
            bindings: {},
            controller: paperValueController
        });
    paperValueController.$inject = ['paperService', "$ngRedux"];

    function paperValueController(paperService, $ngRedux) {
        var ctrl = this;
        var store = $ngRedux;
        ctrl.content = '';
        ctrl.getNextPaper = getNextPaper;
        var unsubscribe = store.subscribe(function () {
            ctrl.room = store.getState().store.room.currentRoom;
            ctrl.player = store.getState().store.player;
        });
        paperService.getNewCurrentPaper(ctrl.room, function (response) {
            ctrl.content = response.data.text;
        });
        function getNextPaper() {
            paperService.getNewCurrentPaper(ctrl.room, function (response) {
                ctrl.content = response.data.text;
            })
        }

    }
})();