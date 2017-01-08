(function () {
    'use strict';
    // var env = {};

    // Import variables if present (from env.js)
    // if (window) {
    //     if (typeof Object.assign != 'function') {
    //         Object.assign = function (target) {
    //             'use strict';
    //             if (target == null) {
    //                 throw new TypeError('Cannot convert undefined or null to object');
    //             }
    //
    //             target = Object(target);
    //             for (var index = 1; index < arguments.length; index++) {
    //                 var source = arguments[index];
    //                 if (source != null) {
    //                     for (var key in source) {
    //                         if (Object.prototype.hasOwnProperty.call(source, key)) {
    //                             target[key] = source[key];
    //                         }
    //                     }
    //                 }
    //             }
    //             return target;
    //         };
    //     }
    //     Object.assign(env, window.__env);
    //
    // }
    angular.module('MoviesApp', [
        'ngMaterial',
        'ngRoute',
        'ngMessages',
        'angularUtils.directives.dirPagination',
        'ui.router',
        'SignalR'
    ]);
    angular.module('MoviesApp').config(config);
    angular.module('MoviesApp').config(routes);
    config.$inject = ['$mdThemingProvider'];
    function config($mdThemingProvider) {
        console.log('hwsai');
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('blue');
    }

    routes.inject = ['$stateProvider', '$urlRouterProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('loginState', {
                url: '/login',
                component: 'loginForm'
            })
            .state('chatWindow', {
                url: '/chat',
                component: 'paperPieces'
            })
            .state('registerForm', {
                url: '/register',
                component: 'registerForm'
            })
            .state('gameWindow', {
                url: '/game',
                component: 'gameWindow'
            })
    }

})();