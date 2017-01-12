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
        'material.components.expansionPanels',
        'ngCookies'
    ]);
    angular.module('PaperGuess').config(config);
    angular.module('PaperGuess').config(routes);
    angular.module('PaperGuess').config(createStore);
    angular.module('PaperGuess').run(['$cookies', '$ngRedux', 'roomService', function ($cookies, $ngRedux, roomService) {
        var store = $ngRedux;
        var player = $cookies.getObject('player');
        if (player) {
            store.dispatch({
                type: 'CREATE_CURRENT_PLAYER',
                player: player
            });
            roomService.getRoomByPlayerId(player, function (response) {
                if (response.data !== null)
                    store.dispatch({
                        type: 'ADD_PLAYER_ROOM',
                        currentRoom: response.data
                    });
            })
        }
    }]);
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
                component: 'paperValue'
            })
    }

    var initialState = {
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
                    id: action.room.id,
                    host: action.room.host,
                    players: action.room.players,
                    game: action.room.name,
                    name: action.room.name,
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

    function playerReducer(player, action) {
        if (typeof player === 'undefined')
            return initialState.player;
        switch (action.type) {
            case 'CREATE_CURRENT_PLAYER':
                return Object.assign({}, player, {
                    name: action.player.name,
                    id: action.player.id
                });
            default:
                return player;
        }
    }


})
();