(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('chatWindow', {
            templateUrl: 'components/chat-window/chat-window.html',
            bindings: {},
            controller: chatWindowController
        });
    chatWindowController.$inject = ['stompService', '$ngRedux'];

    function chatWindowController(stompService, $ngRedux) {
        var ctrl = this;
        var store = $ngRedux;
        ctrl.room = store.getState().store.room.currentRoom;
        ctrl.messages = [];
        stompService.connectToCommunicationServer(ctrl.room, function (payload) {
            var message = {};
            message.content = payload.content;
            if (payload.action === 'guess') {
                if (payload.guessed)
                    message.header = payload.sender + ' guessed correctly:';
                else
                    message.header = payload.sender + ' guesses:';
            }
            else if (payload.action === 'explain') {
                message.header = payload.sender + ' explains:';
            }
            ctrl.messages.push(message);
        });

    }
})();