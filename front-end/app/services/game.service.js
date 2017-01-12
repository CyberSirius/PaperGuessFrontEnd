(function () {
    'use strict';
    angular.module('PaperGuess').factory('gameService', gameService);
    gameService.$inject = ['$http'];
    function gameService($http) {
        var SERVER_URL = 'http://192.168.0.102/paperguess/api' + '/game';
        return {
            startGame: startGame
        };
        function startGame(room, player, callback) {
            return $http.post(SERVER_URL + '?action=start', {
                "roomId": room.id,
                "playerId": player.id
            }).then(function (response) {
                callback(response);
            })
        }
    }
})();