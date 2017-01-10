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
    timerController.$inject = ['$interval'];

    function timerController($interval) {
        var ctrl = this;
        ctrl.determinateValue = 100;

        function stopTimer() {
            $interval.cancel(ctrl.interval);
        }

        function startTimer(time) {
            ctrl.interval = $interval(function () {
                ctrl.determinateValue -= 1;
                if (ctrl.determinateValue == 0)
                    stopTimer();
            }, time * 10)
        }

        ctrl.$onChanges = function (changes) {
            if (changes.time) {
                startTimer(ctrl.time);
            }
        }
    }
})();