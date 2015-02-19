/**
 * Created by wayne on 2/16/15.
 */


var express = require('express');
var scheduleRouter = express.Router();
var scheduleController = require('../controllers/scheduleController');
var telephonyController = require('../controllers/telephonyController');

scheduleRouter
  .get('/', function(request, response){
    scheduleController.findSchedules({}, function(error, schedules){
      //TODO fix this
      response.json(schedules);
    });
  })
  .post('/search', function(request, response){
    scheduleController.findSchedules(request.body, function(error, schedules){
      if (error) {
        return response.status(400).end(error);
      }
      return response.json(schedules);
    })
  })
  // send body.courseId and body.date with body.start, body.end, body.interval
  .post('/', function(request, response){
    scheduleController.addSchedule(request.body, function(error, schedule){
      if (error) {
        return response.status(500).end(error);
      }
      response.status(200).json(schedule);
    });
  })
  .get('/:id/:date', function(request, response){
    scheduleController.findSchedule({ courseId: request.params.id, date: request.params.date }, function(error, schedule){
      if (error) {
        return response.status(500).end(error);
      }
      if (schedule == null) {
        return response.status(404).end('Schedule not found.')
      }
      response.status(200).json(schedule);
    });
  })
  .get('/:id/:date/:start/:end', function(request, response){
    var data = {
      courseId: request.params.id,
      date: request.params.date,
      start: request.params.start,
      end: request.params.end
    };
    scheduleController.hasTeeTime(data, function(error, schedule){
      if (error) {
        return response.status(500).end(error);
      }
      if (schedule == null) {
        return response.status(404).end('Schedule not found.')
      }
      response.status(200).json(schedule);
    });
  })
  .post('/bookTeeTime', function(request,response){
    telephonyController.sendMessage(request.body);

    //courseController.update(
    //  schedule[]
    //)
    response.send("Booking confirmed.");
  });

module.exports = scheduleRouter;