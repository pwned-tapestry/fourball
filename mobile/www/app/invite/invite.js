angular.module('app.invite', [])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.invite', {
    url: '/invite/:courseId/:teeTime/:teeTimeId',
    views: {
      'invite-tab': {
        templateUrl: 'app/invite/invite.html',
        controller: 'InviteIndexCtrl'
      }
    }
  });
})

.controller('InviteIndexCtrl', function($scope, $stateParams, CourseService) {
  $scope.course = CourseService.get($stateParams.courseId);
  $scope.teeTime = $stateParams.teeTime;
  $scope.userInfo = {}
  var teeTimeId = $stateParams.teeTimeId;

  $scope.bookTime = function(){
    var userInfo = {
      userName    : $scope.userInfo.userName,
      userNumber  : $scope.userInfo.userNumber
    };
    CourseService.bookTime(userInfo, teeTimeId);
  }
});
