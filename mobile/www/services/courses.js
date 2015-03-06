angular.module('app.services', [])

.factory('CourseService', ['$http', '$q', CourseService]);

function CourseService($http, $q) {
  this._courses = [];

  function getCoursesWithTeeTimes() {
    var deferred = $q.defer();
    var that = this;
    $http.get("http://localhost:1337/api/coursesWithTeeTimes")
      .success(function(data, status) {
        that._courses = data;
        that._courses[0].url = '../img/golf_4.jpg';
        that._courses[1].url = '../img/golf_5.jpg';
        that._courses[2].url = '../img/golf_6.jpg';
        deferred.resolve(data);
      })
      .error(function(data, status) {
        console.log('error :', status);
        deferred.reject();
      });
    return deferred.promise;
  }

  function get(courseId) {
    return this._courses.filter(function(elem) {
      return elem._id === courseId;
    })[0];
  }

  function bookTime(userInfo, teeTimeId) {

    var newUser = {
      cell: userInfo.userName,
      firstName: userInfo.userNumber
    };
    var deferred = $q.defer();
    //create a new user
    $http.post("http://localhost:1337/api/user", newUser)

    .success(function(data, status){
      deferred.resolve(data);

      //then send a text, to that user
      $http.post("http://localhost:1337/api/schedule/bookTeeTime", userInfo)
        .success(function(data, status){
          console.log('success:', status);
        })
        .error(function(data, status){
          console.log('error :', status);
        });
      // book the teeTime -- should be combined into one api call with above post to schedule/bookTeeTime
      $http.post("http://localhost:1337/api/bookteetime",{userId: data._id, teetimeId: teeTimeId})
        .success(function(data, status) {
          console.log("success:", status);
        })
        .error(function(data, status) {
          console.log("error:", status);
        });
    })
    .error(function(data, status) {
      console.log("error:", status);
      deferred.reject();
    });
    return deferred.promise;
  }

  function sendInvites(info) {
    $http.post("http://localhost:1337/api/inviteLinks", info)
    .success(function(data, status) {
      console.log("success:", status);
    })
    .error(function(data, status) {
      console.log("error:", status);
    });
  }

  return {
      getCoursesWithTeeTimes: getCoursesWithTeeTimes,
      get: get,
      bookTime: bookTime,
      sendInvites: sendInvites
  };
};
