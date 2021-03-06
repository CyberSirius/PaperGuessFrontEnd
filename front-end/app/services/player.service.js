(function () {
    'use strict';
    angular.module('PaperGuess').factory('playerService', playerService);
    playerService.$inject = ['$http'];
    function playerService($http) {
        return {
            sendPlayerName: sendPlayerName,
            getPlayers: getPlayers
        };
        function sendPlayerName(name, callback) {
            var SERVER_URL = 'http://192.168.0.102/paperguess/api';
            return $http.put(SERVER_URL + '/players', name).then(function (response) {
                callback(response);
            }, function (error) {
                console.log(error);
            })
        }

        function getPlayers() {
            return $http.get('http://192.168.0.105:80/paperguess/api/players').then(function (response) {
                return response.data;
            })
        }
    }
})();