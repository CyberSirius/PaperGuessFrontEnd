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
        ctrl.content = '';
        ctrl.getNextPaper = getNextPaper;
        ctrl.room = $ngRedux.getState().store.room.currentRoom;
        paperService.getNewCurrentPaper(ctrl.room, function (response) {
            ctrl.content = response.data.content;
        });
        function getNextPaper() {
            paperService.getNewCurrentPaper(ctrl.room, function (response) {
                ctrl.content = response.data.content;
            })
        }

    }
})();