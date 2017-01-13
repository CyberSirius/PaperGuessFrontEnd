(function () {
    'use strict';
    angular.module('PaperGuess').factory('gameService', gameService);
    gameService.$inject = ['$http'];
    function gameService($http) {
        var SERVER_URL = 'http://192.168.0.102/paperguess/api' + '/game';
        return {
            startGame: startGame,
            messageServer: messageServer,
            nextTurn: nextTurn
        };
        function startGame(room, player, callback) {
            return $http.post(SERVER_URL + '?action=start', {
                "roomId": room.id,
                "playerId": player.id
            }).then(function (response) {
                callback(response);
            })
        }

        function messageServer(content, player, action, room, callback) {
            var message = {
                roomId: room.id,
                content: content,
                playerId: player.id
            };
            return $http.post(SERVER_URL + '?action=' + action, message).then(function (response) {
                callback(response);
            });
        }

        function nextTurn(room, callback) {
            return $http.post(SERVER_URL + '?action=nextTurn', {
                "roomId": room.id
            }).then(function (response) {
                callback(response);
            })
        }

    }
})();