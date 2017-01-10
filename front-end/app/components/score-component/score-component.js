(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('scoreComponent', {
            templateUrl: 'components/score-component/score-component.html',
            bindings: {
                teamScores: '<'
            },
            controller: scoreComponentController
        });
    scoreComponentController.$inject = [];

    function scoreComponentController() {
        var ctrl = this;

    }
})();