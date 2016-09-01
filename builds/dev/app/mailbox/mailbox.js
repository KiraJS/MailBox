// Code goes here
;
(function() {
  'use strict';

  angular.module('mailBoxApp', [
    'mailBoxApp.users',
    'mailBoxApp.send',
    'ui.router',
    'firebase'
  ]);

  angular.module('mailBoxApp')
    .service('MailService', function($firebaseObject, $firebaseArray) {
      var ref = new Firebase('https://mailboxapp.firebaseio.com/');
      var mailsRef = ref.child('mails');
      this.mails = $firebaseArray(mailsRef);
      var outgoingRef = ref.child('outgoing');
      this.outgoing = $firebaseArray(outgoingRef);
    })
    .component('incomingBox', {
      templateUrl: '/app/mailbox/incomingBox.html',
      controller: function(MailService) {
        this.mails = MailService.mails;
      }
    })
    .component('incomingLetter', {
      templateUrl: '/app/mailbox/incomingLetter.html',
      bindings: {
        mail: '<'
      },
    })
    .component('outgoingBox', {
      templateUrl: '/app/mailbox/outgoingBox.html',
      controller: function(MailService) {
        this.outgoing = MailService.outgoing;
      }
    })
    .component('outgoingLetter', {
      templateUrl: '/app/mailbox/outgoingLetter.html',
      bindings: {
        outgoing: '<'
      },
    })
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/incoming');
      $stateProvider
        .state('incoming', {
          url: "/incoming",
          template: '<incoming-box></incoming-box>'
        })
        .state('outgoing', {
          url: "/outgoing",
          template: '<outgoing-box></outgoing-box>'
        })
    })
})();
