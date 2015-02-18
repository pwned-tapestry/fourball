angular.module('app.courses.details', [])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.course-detail', {
    url: '/course/:courseId',
    views: {
      'courses-tab': {
        templateUrl: 'app/courses/details/details.html',
        controller: 'CourseDetailCtrl'
      }
    }
  });
})

.controller('CourseDetailCtrl', function($scope, $stateParams, CourseService) {
  $scope.course = CourseService.get($stateParams.courseId);
});
