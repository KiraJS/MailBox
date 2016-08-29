;(function(){
  angular.module('mailBoxApp.send', ['ui.router', 'firebase']);
  angular.module('mailBoxApp.send')
    .service('SendService', function($firebaseObject, $firebaseArray){
      var ref = new Firebase('https://mailboxapp.firebaseio.com/');
      var mailsRef = ref.child('mails');
      this.mails = $firebaseArray(mailsRef);
      var outgoingRef = ref.child('outgoing');
      this.outgoing = $firebaseArray(outgoingRef);
      this.pushData = function(_newLetter){
        this.outgoing.$add({recipient: _newLetter.recipient, theme: _newLetter.theme, text: _newLetter.text})
      }
    })
    .component('send', {
      templateUrl: '/app/send/send.html',
      controller: function(SendService) {
        this.show = true;
        this.saveLetter = function(){
          this.show = false;
          SendService.pushData(this.newLetter);
        }
        this.newLetter = {
          recipient: "",
          theme: "",
          text: ""
        }
      }
    })
    .config(function($stateProvider){
      $stateProvider
      .state('send', {
        url: "/send",
        template: '<send></send>'
      })
    })
})();
