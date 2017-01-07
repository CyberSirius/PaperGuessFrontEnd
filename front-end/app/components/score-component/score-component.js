(function () {
    'use strict';
    angular
        .module('MoviesApp')
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