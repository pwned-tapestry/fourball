angular.module('app.courses.details', [])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.course-detail', {
    url: '/course/:courseId',
    views: {
      'courses-tab': {
        templateUrl: 'app/courses/details/details.html',
        controller: 'CourseDetailCtrl as vm'
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

.controller('CourseDetailCtrl', function($stateParams, CourseService) {
  var vm = this;
  vm.course = CourseService.get($stateParams.courseId);
  vm.limit = 3;
  vm.dateSelected = false;
  vm.getDateTime = function(event) {
    var datetime = event.target.value;
    var re = /\d{2}:\d{2}/ig;
    var result = re.exec(datetime)[0];
    vm.teeTime = result.split(':').join("");
    vm.dateSelected = true;
  }

  vm.gteOrEqlSelectTeeTime = function(info){
    return info.time > vm.teeTime;
  }

});
