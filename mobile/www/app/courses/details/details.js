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
  $scope.limit = 3;
  $scope.dateSelected = false;
  $scope.getDateTime = function(event) {
    var datetime = event.target.value;
    var re = /\d{2}:\d{2}/ig;
    var result = re.exec(datetime)[0];
    $scope.teeTime = result.split(':').join("");
    $scope.dateSelected = true;
  }

  $scope.gteOrEqlSelectTeeTime = function(info){
    return info.time > $scope.teeTime;
  }

});
