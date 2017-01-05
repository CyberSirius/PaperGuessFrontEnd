(function () {
    'use strict';
    angular.module('MoviesApp').config(routes);
    routes.inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('loginState', {
                url: '/login',
                component: 'loginForm'
            })
    }
});