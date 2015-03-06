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
  })
  .state('tab.inviteBlank', {
    url: '/invite',
    views: {
      'invite-tab': {
        templateUrl: 'app/invite/invite.html',
        controller: 'InviteIndexCtrl'
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
  vm.cell_1 = "2134441061";
  vm.cell_2 = "2132156162";
  vm.cell_3 = "5555555555";
  vm.isDisabled = true;
  vm.isHidden = true;
  vm.bookTime = function(){
    var userInfo = {
      userName    : vm.userInfo.userName,
      userNumber  : vm.userInfo.userNumber,
      invitees    : vm.userInfo.invitees
    };
    CourseService.bookTime(userInfo, teeTimeId)
    .then(function(data) {
      console.log("data after bookTime:", data);
      vm.isDisabled = false;
    });
  }

  vm.sendInvites = function() {
    var inviteInfo = {
      teetimeId: teeTimeId,
      cells: [vm.cell_1, vm.cell_2, vm.cell_3]
    };
    CourseService.sendInvites(inviteInfo);
  }

  var pulledContacts = [];
});
