(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('chatWindow', {
            templateUrl: 'components/chat-window/chat-window.html',
            bindings: {},
            controller: chatWindowController
        });
    chatWindowController.$inject = ['stompService', '$ngRedux', 'gameService'];

    function chatWindowController(stompService, $ngRedux, gameService) {
        var ctrl = this;
        var store = $ngRedux;
        ctrl.currentMessage = '';
        var unsubscribe = store.subscribe(function () {
            ctrl.room = store.getState().store.room.currentRoom;
            ctrl.player = store.getState().store.player;
        });
        ctrl.isExplainer = ctrl.player.id === ctrl.room.game.explainer.id;
        ctrl.isGuesser = ctrl.player.id === ctrl.room.game.guesser.id;
        ctrl.sendMessage = sendMessage;
        ctrl.messages = [];
        stompService.connectToCommunicationServer(ctrl.room, function (payload) {
            var message = {};
            message.content = payload.message;
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
        function sendMessage() {
            let action = 'explain';
            if (ctrl.isGuesser)
                action = 'guess';
            gameService.messageServer(ctrl.currentMessage, ctrl.player, action, ctrl.room, function (response) {
                console.log(response);
            })
        }
    }
})();