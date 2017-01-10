(function () {
    'use strict';
    angular
        .module('PaperGuess')
        .component('chatWindow', {
            templateUrl: 'components/chat-window/chat-window.html',
            bindings: {},
            controller: chatWindowController
        });
    chatWindowController.$inject = ['$http'];

    function chatWindowController($http) {
        var ctrl = this;
        // $http.get('http://192.168.0.101:80/reactchat/api/chat/5').then(function (response) {
        //     ctrl.msgs = response.data;
        //     console.log(response.data);
        // });
        ctrl.msgs = [
            {
                "Message": "Ea qui aute esse ipsum sint. Qui irure qui aliquip in enim ea non qui do. Incididunt et velit labore non incididunt mollit.",
                "DateTime": "explainer",
                "UserName": "5870fbebd8264ac96567c0f5"
            },
            {
                "Message": "Velit velit excepteur voluptate sunt irure exercitation Lorem. Pariatur nostrud quis ipsum tempor duis consectetur. Laborum non excepteur excepteur culpa ut reprehenderit consequat aliquip occaecat. Qui adipisicing qui sunt ea exercitation ad enim officia non nisi officia. Incididunt sint non dolore sint culpa ad fugiat enim consequat ad aliqua fugiat enim.",
                "DateTime": "explainer",
                "UserName": "5870fbeb8f48edfee76088dc"
            },
            {
                "Message": "Quis est irure duis dolor velit ut. Ea commodo sunt officia commodo deserunt velit amet laborum sint adipisicing id dolor eiusmod. Est commodo fugiat sint fugiat cillum eu elit tempor incididunt mollit. Cupidatat velit eu non nostrud dolor.",
                "DateTime": "explainer",
                "UserName": "5870fbebbcb05e7ef33eaf30"
            },
            {
                "Message": "Est elit nulla nostrud nostrud aliquip voluptate reprehenderit voluptate sunt cupidatat. Adipisicing amet exercitation consectetur mollit duis ut culpa exercitation ea nulla. Tempor eu minim dolore in sit est ex. Aute sint elit ad sit elit dolore veniam labore dolor nisi aliquip aliqua.",
                "DateTime": "guesser",
                "UserName": "5870fbeb685d61fcb47f0ce1"
            }
        ];

    }
})();