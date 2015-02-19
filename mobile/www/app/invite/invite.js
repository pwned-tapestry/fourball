angular.module('app.invite', [])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.invite', {
    url: '/invite',
    views: {
      'invite-tab': {
        templateUrl: 'app/invite/invite.html',
        controller: 'InviteIndexCtrl'
      }
    }
  });
})

.controller('InviteIndexCtrl', function($scope, CourseService) {
  $scope.userInfo = {}
  $scope.bookTime = function(){
    var userInfo = {
      userName    : $scope.userInfo.userName,
      userNumber  : $scope.userInfo.userNumber
    };
    CourseService.bookTime(userInfo); 
  }
});
