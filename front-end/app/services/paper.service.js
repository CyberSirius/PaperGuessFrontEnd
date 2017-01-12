(function () {
    'use strict';
    angular.module('PaperGuess').factory('paperService', paperService);
    paperService.$inject = ['$http'];
    function paperService($http) {
        var SERVER_URL = 'http://192.168.0.102/paperguess/api';
        return {
            addNewPaper: addNewPaper,
            getNewCurrentPaper: getNewCurrentPaper
        };
        function addNewPaper(paper, callback) {
            var message = {
                playerId: paper.player.id,
                roomId: paper.room.id,
                content: paper.content
            };
            return $http.put(SERVER_URL + '/papers', message).then(function (response) {
                return callback(response);
            })
        }

        function getNewCurrentPaper(room, callback) {
            return $http.get(SERVER_URL + '/papers?roomId=' + room.id).then(function (response) {
                return callback(response);
            })
        }
    }
})();