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
    angular.module('PaperGuess', [
        'ngMaterial',
        'ngRoute',
        'ngMessages',
        'angularUtils.directives.dirPagination',
        'ui.router',
        'SignalR',
        'ngStomp',
        'ngRedux',
        'material.components.expansionPanels'
    ]);
    angular.module('PaperGuess').config(config);
    angular.module('PaperGuess').config(routes);
    angular.module('PaperGuess').config(createStore);
    config.$inject = ['$mdThemingProvider'];
    function config($mdThemingProvider) {
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
            .state('chatState', {
                url: '/chat',
                component: 'chatWindow'
            })
            .state('registerState', {
                url: '/register',
                component: 'registerForm'
            })
            .state('gameState', {
                url: '/game',
                component: 'gameWindow'
            })
            .state('homeState', {
                url: '/home',
                component: 'homePage'
            })
            .state('testState', {
                url: '/test',
                component: 'homePage'
            })
    }

    var initialState = {
        test: {
            somethingToLog: 'nothing to log yet',
        },
        player: {
            name: null,
            id: null
        },
        room: {
            rooms: [],
            currentRoom: null
        }
    };
    createStore.$inject = ['$ngReduxProvider', '$windowProvider'];
    function createStore($ngReduxProvider, $windowProvider) {
        var reducers = {
            'player': playerReducer,
            'test': testReducer,
            'room': roomReducer
        };
        let window = $windowProvider.$get();
        var store = window.Redux.combineReducers(reducers);
        $ngReduxProvider.createStoreWith({
            store: store
        });
    }

    function roomReducer(room, action) {
        if (typeof room === 'undefined')
            return initialState.room;
        switch (action.type) {
            case 'ADD_NEW_ROOM': {
                room.rooms = angular.copy(room.rooms);
                room.rooms.push({
                        Id: action.room.Id,
                        Host: action.room.Host,
                        Players: action.room.Players,
                        Game: action.room.Game,
                        Name: action.room.Name
                    }
                );
                return room;
            }
            case 'ADD_CURRENT_ROOMS':
                return Object.assign({}, room, {
                    rooms: action.rooms
                });
            case 'ADD_PLAYER_ROOM':
                return Object.assign({}, room, {
                    currentRoom: action.currentRoom
                });
            default:
                return room;
        }
    }


    function testReducer(test, action) {
        if (typeof test === 'undefined')
            return initialState.test;
        switch (action.type) {
            case 'TEST_ACTION':
                return Object.assign({}, test, {
                    somethingToLog: action.data
                });
            default:
                return test
        }
    }

    function playerReducer(player, action) {
        if (typeof player === 'undefined')
            return initialState.player;
        switch (action.type) {
            case 'CREATE_CURRENT_PLAYER':
                return Object.assign({}, player, {
                    name: action.player.Name,
                    id: action.player.Id
                });
            default:
                return player;
        }
    }


})
();