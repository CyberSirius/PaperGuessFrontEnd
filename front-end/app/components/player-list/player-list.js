(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('playerList', {
            templateUrl: 'components/player-list/player-list.html',
            bindings: {
                players: '<'
            },
            controller: playerListController
        });
    playerListController.$inject = [];

    function playerListController() {
        var ctrl = this;

    }
})();