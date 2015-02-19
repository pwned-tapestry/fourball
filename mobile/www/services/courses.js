angular.module('app.services', [])

.factory('CourseService', ['$http', CourseService]);

function CourseService($http) {
  this._courses = [];

  function getCoursesWithTeeTimes(callback) {
    var that = this;
    $http.get("http://localhost:8080/api/coursesWithTeeTimes")
      .success(function(courses, status, headers, config) {
        console.log("Received data via HTTP");
        that._courses = courses;
        that._courses[0].url = 'http://www.kauaigolfclubrentals.com/wp-content/uploads/2011/09/kiahuna-golf-course-kauai.jpg';
        that._courses[1].url = 'http://www.clubcorp.com/var/ezflow_site/storage/images/media/clubs/teal-bend-media-folder/images/facilities/golf-course/tealbendgolfclub-hole16-960x410.jpg/3836500-1-eng-US/TealBendGolfClub-Hole16-960x410.jpg_rotatingGalleryFront.jpg';
        that._courses[2].url = 'http://www.glengolfdesign.com/docs/golf-course-green.jpg';
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

  function bookTime(userInfo) {
    console.log("sending userInfo :", userInfo);
    console.log("http...", $http);

    $http.post("localhost:8080/api/schedule/bookTeeTime", userInfo)
      .success(function(data, status){
        console.log("success", data);
      })
      .error(function(data, status){
        console.log("failure :", data);
      });
  } 

  return {
      getCoursesWithTeeTimes: getCoursesWithTeeTimes,
      get: get,
      bookTime: bookTime
  };
};
