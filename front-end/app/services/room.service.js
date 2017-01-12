(function () {
    'use strict';
    angular.module('PaperGuess').factory('roomService', roomService);
    roomService.$inject = ['$http'];
    function roomService($http) {
        var SERVER_URL = 'http://192.168.0.102/paperguess/api' + '/rooms';
        return {
            createNewRoom: createNewRoom,
            logInRoom: logInRoom,
            getRooms: getRooms,
            getRoomByPlayerId: getRoomByPlayerId
        };
        function getRoomByPlayerId(player, callback) {
            return $http.get(SERVER_URL + '?playerId=' + player.id).then(function (response) {
                return callback(response);
            });
        }

        function createNewRoom(room, callback) {
            console.log(room);
            var message = {
                clientMessage: {
                    playerId: room.host.id
                },
                room: {
                    name: room.name
                }
            };
            return $http.put(SERVER_URL, message).then(function (response) {
                callback(response.data);
            }, function (error) {
                console.log(error);
            })
        }

        function logInRoom(room, player, callback) {
            var message = {
                "roomId": room.id,
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