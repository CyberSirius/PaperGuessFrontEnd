(function () {
    'use strict';
    angular.module('PaperGuess').config(routes);
    routes.inject = ['$stateProvider', '$urlRouterProvider'];
    console.log('wtf?');
});