(function () {
    'use strict';
    angular.module('PaperGuess').factory('roomService', roomService);
    roomService.$inject = ['$http'];
    function roomService($http) {
        var SERVER_URL = 'http://192.168.0.102/paperguess/api' + '/rooms';
        return {
            createNewRoom: createNewRoom,
            logInRoom: logInRoom,
            getRooms: getRooms
        };
        function createNewRoom(room, callback) {
            var message = {
                clientMessage: {
                    playerId: room.host.id
                },
                room: {
                    name: room.name
                }
            };
            return $http.put(SERVER_URL, message).then(function (response) {
                console.log(response.data);
                callback(response.data);
            }, function (error) {
                console.log(error);
            })
        }

        function logInRoom(room, player, callback) {
            var message = {
                "roomId": room.Id,
                "playerId": player.id
            };
            return $http.post(SERVER_URL, message).then(function (response) {
                return callback(response);
            }, function (error) {
                console.log(error);
            })
        }

        function getRooms(callback) {
            return $http.get(SERVER_URL).then(function (response) {
                callback(response.data);
            })
        }
    }
})();