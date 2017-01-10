(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('paperPieces', {
            templateUrl: 'components/paper-pieces/paper-pieces.html',
            bindings: {},
            controller: paperPiecesController
        });
    paperPiecesController.$inject = [];

    function paperPiecesController() {
        var ctrl = this;
    }
})();