(function () {
    'use strict';
    angular.module('PaperGuess').factory('stompService', stompService);
    stompService.$inject = ['$stomp', '$rootScope'];
    function stompService($stomp, $rootScope) {
        return {
            connectToCommunicationServer: connectToCommunicationServer
        };
        function connectToCommunicationServer(room, callback) {
            $stomp.connect('http://192.168.0.101:8080/paperguess').then(function (frame) {
                var subscription = $stomp.subscribe('/chat/' + room.id, function (payload, headers, res) {
                    $rootScope.$apply(callback(payload));
                }, {});
            })
        }
    }
})();