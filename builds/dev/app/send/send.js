;(function(){
  angular.module('mailBoxApp.send', ['ui.router']);
  angular.module('mailBoxApp.send')
    .service('SendService', function(){
    })
    .component('send', {
      templateUrl: '/app/send/send.html',
      controller: function(SendService) {
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
