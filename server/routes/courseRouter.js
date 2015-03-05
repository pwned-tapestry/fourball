/**
 * Created by wayne on 2/14/15.
 */


var express = require('express');
var courseRouter = express.Router();
var courseController = require('../controllers/courseController');

//Post to sortedCourses, requires a request body with the following data:
//Working supertest example:
// var requestData = {
//   miles: 15,
//   limit: 3,
//   coordinates: [37.783707, -122.408978]
// }
// superagent.post("foreball.azurewebsites.net/api/course/sortedCourses")
//   .send(requestData)
//   .end(function(err, results){
courseRouter
  .post('/sortedCourses', function(request, response){
    console.log('inside SortedCourses');
    if (!request.body){
      return response.end(new Error("Error : No request.body."));
    }
    courseController.findCourseWithinMiles(request.body, function(error, courses){
      if (error){
        return response.end(error);
      }
      return response.json(courses);
    });

  })
//Adding an additional course, with params.
  .post('/', function(request, response){
    // TODO: Error checking in course PUT
    courseController.addCourse(request.body, function(error, course){
      if (error) {
        return response.end(error);
      }
      response.json(course);
    });

  })
  .get('/', function(request, response){
    courseController.findCourses({}, function(error, courses){
      if (error) {
        return response.end(error);
      }
      return response.json(courses);
    });
  })
  .get('/:id', function(request, response){
    courseController.findCourse({ _id: request.params.id }, function(error, course){
      if (error) {
        return response.end(error);
      }
      return response.json(course);
    });
  })
  .put('/:id', function(request, response){
    courseController.updateCourse({ _id: request.params.id }, request.body, function(error, rows){
      if (error) {
        return response.end(error);
      }
      response.json(rows);
    });
  });

module.exports = courseRouter;
