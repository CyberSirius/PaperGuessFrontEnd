(function () {
    'use strict';
    angular.module('PaperGuess').config(config);
    config.$inject = ['$mdThemingProvider'];
    function config($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('blue');
    }
});