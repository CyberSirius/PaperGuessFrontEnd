(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('timer', {
            templateUrl: 'components/timer/timer.html',
            bindings: {
                time: '<'
            },
            controller: timerController
        });
    timerController.$inject = ['$interval', 'gameService'];

    function timerController($interval, gameService) {
        var ctrl = this;
        ctrl.determinateValue = 100;
        var unsubscribe = store.subscribe(function () {
            ctrl.room = store.getState().store.room.currentRoom;
            ctrl.player = store.getState().store.player;
        });

        function stopTimer() {
            $interval.cancel(ctrl.interval);
        }

        function startTimer(time) {
            ctrl.interval = $interval(function () {
                ctrl.determinateValue -= 1;
                if (ctrl.determinateValue == 0) {
                    gameService.nextTurn(ctrl.room, function (response) {
                        ctrl.determinateValue = 100;
                        // TODO: 13-Jan-17 make sure that's the response
                        ctrl.room.game = response.data;
                        store.dispatch({
                            type: 'ADD_PLAYER_ROOM',
                            currentRoom: ctrl.room
                        });
                    });
                }
            }, time * 10)
        }

        ctrl.$onChanges = function (changes) {
            if (changes.time) {
                startTimer(ctrl.time);
            }
        }
    }
})();