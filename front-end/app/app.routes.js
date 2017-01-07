(function () {
    'use strict';
    angular.module('MoviesApp').config(routes);
    routes.inject = ['$stateProvider', '$urlRouterProvider'];
    console.log('wtf?');
});