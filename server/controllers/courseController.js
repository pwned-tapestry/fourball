/**
 * Created by wayne on 2/13/15.
 */

var Course = require('../models/courseModelMongo');

var addCourse = function(data, callback) {
  var course = new Course(data);
  course.save(function(error, course){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, course);
  });
};

var findCourse = function(data, callback){

  Course.findOne(data, function(error, course){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, course);
  });

};

var findCourses = function(data, callback){
  Course.find(data, function(error, courses){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, courses);
  });

};

var updateCourse = function(findData, updateData, callback) {
  Course.update(findData, updateData, function(error, numAffected){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, numAffected);
  });
};


//signature example: findCourseWithinMiles(10, 3, [37.783682, -122.409021], fn(){})
var findCourseWithinMiles = function(requestData, callback){
  console.log("in fcwM: ,", requestData);
  //data signature:
  //
  // {
  // miles: num,
  // limit: num,
  // coordinates: [num, num]
  // }
  var miles       = requestData.miles; 
  var limit       = requestData.limit;
  var coordinates = requestData.coordinates;

  Course.geoNear(
    {type: "Point", coordinates: coordinates}, 
    {
      maxDistance: miles*180/(Math.PI*3959),
      num: limit
    })
    .then(function (results) {
      console.log("returned query Unordered Results:", results);
      //Native sort, sorts results by distance;
      results = results.sort(function(x,y){
        if (x.dis < y.dis){
          return -1;
        } else if (x.dis > y.dis){
          return 1;
        } else {
          return 0;
        }
      })
      callback(undefined, results);
    }, function(err){
      callback(err, undefined);
    });
};

module.exports = {
  addCourse: addCourse,
  findCourse: findCourse,
  findCourses: findCourses,
  updateCourse: updateCourse,
  findCourseWithinMiles: findCourseWithinMiles
};
