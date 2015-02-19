angular.module('app.courses', ['app.courses.details'])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.course-index', {
    url: '/courses',
    views: {
      'courses-tab': {
        templateUrl: 'app/courses/courses.html',
        controller: 'CourseIndexCtrl'
      }
    }
  });
})

.directive('backImg', function() {
  return function(scope, element, attrs) {
    var url = attrs.backImg;
    var content = element.find('a');
    content.css({
      'background': 'url(' + url + ') no-repeat'
    });
  };
})

.controller('CourseIndexCtrl', function ($scope, CourseService) {
  CourseService.getCoursesWithTeeTimes(function(courses){
    $scope.courses = courses;
  });
});
