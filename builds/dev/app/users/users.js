;(function(){
  angular.module('mailBoxApp.users', ['ui.router']);
  angular.module('mailBoxApp.users')
    .service('UsercService', function($firebaseObject, $firebaseArray){
      var ref = new Firebase('https://mailboxapp.firebaseio.com/');
      var usersRef = ref.child('users');
      this.users = $firebaseArray(usersRef);
       console.log("test", this.users);
    })
    .component('userBox', {
      templateUrl: '/app/users/users.html',
      controller: function(UsercService) {
        this.users = UsercService.users;
      }
    })
    .component('userCard', {
      templateUrl: '/app/users/user.html',
      bindings: {
        user: '<'
      }
    })
    .config(function($stateProvider){
      $stateProvider
      .state('users', {
        url: "/users",
        template: '<user-box></user-box>'
      })
    })
})();
