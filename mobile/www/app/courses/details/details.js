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
  console.log("vm.course : ", vm.course);
  vm.limit = 3;
  vm.dateSelected = false;
  vm.getDateTime = function(event) {
    var datetime = event.target.value;
    console.log('dateTime :', datetime);
    var re = /\d{2}:\d{2}/ig;
    var result = re.exec(datetime)[0];
    console.log("result : ", result);
    vm.teeTime = result.split(':').join("");
    console.log("vm.teeTime", vm.teeTime);
    vm.dateSelected = true;
  }

  vm.gteOrEqlSelectTeeTime = function(info){
    return info.time > vm.teeTime;
  }

});
