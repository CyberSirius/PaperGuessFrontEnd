(function () {
    'use strict';
    angular
        .module('MoviesApp')
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