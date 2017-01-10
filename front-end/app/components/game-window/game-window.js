(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('gameWindow', {
            templateUrl: 'components/game-window/game-window.html',
            bindings: {},
            controller: gameWindowController
        });
    gameWindowController.$inject = [];

    function gameWindowController() {
        var ctrl = this;
    }
})();