/**
 * Created by wayne on 2/16/15.
 */


var express = require('express');
var coreRouter = express.Router();
var courseController = require('../controllers/courseController');
var scheduleController = require('../controllers/scheduleController');


coreRouter
  .post('/bookteetime', function(request, response){
    scheduleController.bookTeeTime(request.body, function(error, result){
      if (error) {
        console.log("error", error);
        return response.status(500).end(error);
      }
      console.log("Success 201");
      return response.status(201).json(result);
    });
  })
  .get('/coursesWithTeeTimes', function(request, response){
    courseController.findCourses({}, function(error, courses){
      if (error) {
        return response.end(error);
      }
      asyncMap([
        function(cb){
          scheduleController.hasTeeTime({
            courseId: courses[0]._id,
            date: '02252015',
            start: '0600',
            end: '1500' }, function(error, schedule){
            cb(schedule);
          })
        },
        function(cb){
          scheduleController.hasTeeTime({
            courseId: courses[1]._id,
            date: '02252015',
            start: '0600',
            end: '1500' }, function(error, schedule){
            cb(schedule);
          })
        },
        function(cb){
          scheduleController.hasTeeTime({
            courseId: courses[2]._id,
            date: '02252015',
            start: '0600',
            end: '1500' }, function(error, schedule){
            cb(schedule);
          })
        }
      ], function(results){
        var back = [];
        for (var i = 0; i < results.length; i++) {
          back[i] = courses[i].toObject();
          if (results[i] !== null) {
            back[i].teetimes = results[i].teetimes;
          } else {
            back[i].teetimes = [];
          }
        }

        response.json(back);
      });
    });
  })
  .put('/teetimes/:teetimeId/:cell', function(request, response){
    console.log("request", request.params);
    scheduleController.addPlayerToTeeTime(request.params, function(error, result){
      if (error) {
        console.log("error", error);
        return response.status(500).end(error);
      }
      console.log("Success 201");
      return response.status(201).json(result);
      // return response.location("courseInput/confirm.html");
    });
  });


var asyncMap = function (tasks, callback) {
  var results = [];
  var totalResults = 0;

  for (var i = 0; i < tasks.length; i++) {

    (function (taskNumber) {
      tasks[taskNumber](function(result) {
        results[taskNumber] = result;
        totalResults += 1;
        if (totalResults === tasks.length) callback(results);
      });

    })(i);
  }
};


module.exports = coreRouter;