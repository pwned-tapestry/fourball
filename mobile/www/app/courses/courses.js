angular.module('app.courses', ['app.courses.details'])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.course-index', {
    url: '/courses',
    views: {
      'courses-tab': {
        templateUrl: 'app/courses/courses.html',
        controller: 'CourseIndexCtrl as vm'
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

.controller('CourseIndexCtrl', function (CourseService) {
  var vm = this;
  console.log('controller loaded');
  CourseService.getCoursesWithTeeTimes()
  .then(function(courses) {
    console.log('got some courses');
    vm.courses = courses;
  });
});
