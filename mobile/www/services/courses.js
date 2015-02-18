angular.module('app.services', []).factory('CourseService', ['$http', CourseService]);

function CourseService($http) {
  this._courses = [];

  function getCoursesWithTeeTimes(callback) {
    var that = this;
    $http.get("http://localhost:8080/api/coursesWithTeeTimes")
      .success(function(courses, status, headers, config) {
        console.log("Received data via HTTP");
        that._courses = courses;
        callback(courses);
      })
      .error(function(courses, status, headers, config) {
        console.log("Error while making HTTP call.");
      });
  }

  function get(courseId) {

    return this._courses.filter(function(elem) {
      return elem._id === courseId;
    })[0];
  }

  return {
      getCoursesWithTeeTimes: getCoursesWithTeeTimes,
      get: get
  };
};
