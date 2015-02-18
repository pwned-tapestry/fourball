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

.directive('backImg', function() {
  return function(scope, element, attrs) {
    var url = attrs.backImg;
    element.css({
      'background': 'url(' + url + ') no-repeat',
      'background-size': 'cover'
    });
  };
})

.controller('CourseDetailCtrl', function($scope, $stateParams, CourseService) {
  $scope.course = CourseService.get($stateParams.courseId);
});
