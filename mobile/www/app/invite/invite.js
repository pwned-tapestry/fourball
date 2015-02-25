angular.module('app.invite', [])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.invite', {
    url: '/invite/:courseId/:teeTime/:teeTimeId',
    views: {
      'invite-tab': {
        templateUrl: 'app/invite/invite.html',
        controller: 'InviteIndexCtrl as vm'
      }
    }
  });
})

.controller('InviteIndexCtrl', function($stateParams, CourseService) {
  var vm = this;
  vm.course = CourseService.get($stateParams.courseId);
  vm.teeTime = $stateParams.teeTime;
  vm.userInfo = {}
  var teeTimeId = $stateParams.teeTimeId;

  vm.bookTime = function(){
    var userInfo = {
      userName    : vm.userInfo.userName,
      userNumber  : vm.userInfo.userNumber,
      invitees    : vm.userInfo.invitees
    };
    CourseService.bookTime(userInfo, teeTimeId);
  }
});
