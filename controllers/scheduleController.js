/**
 * Created by wayne on 2/14/15.
 */

var Schedule = require('../models/scheduleModelMongo');


var makeSchedule = function(start, end, minutes) {
  var result = [];

  start = nextTime(start, 0);

  while (Number(start) < Number(end)) {
    result.push({
      time: start,
      reserved: false,
      reservedBy: null,
      numPlayers: 4,
      players: []
    });
    start = nextTime(start, minutes);
  }

  return result;

};

var nextTime = function(timeIn, timeInc) {

  // must hae 4 dude
  timeIn = ('000' + timeIn).slice(-4);
  // snag hours mins from string
  var hours = Number(timeIn.slice(0,2));
  var minutes = Number(timeIn.slice(2));
  // add timeInc for next teetime
  minutes += +timeInc;
  if (minutes > 59) {     // wrap hours
    minutes -= 60;
    hours += 1;
  }
  // return: hours to 2 char + min to 2 char
  return ('0' + hours).slice(-2) + ('0' + minutes).slice(-2);

};

var addSchedule = function(data, callback) {

  // get a schedule for the whole day
  var teetimes = makeSchedule(data.start, data.end, data.interval);
  // prep data to save
  var scheduleData = {
    courseId: data.courseId,
    date: data.date,
    teetimes: teetimes
  };

  var schedule = new Schedule(scheduleData);

  schedule.save(function(error, schedule){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, schedule);
  });
};


var findSchedule = function(data, callback) {
  Schedule.findOne(data, function(error, schedule){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, schedule);
  });
};

var findSchedules = function(data, callback) {
  Schedule.find(data, function(error, schedules){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, schedules);
  });
};

// id = courseId
// date = 'MMDDYYYY' style date
// start = 'HHMM' start time
// end = 'HHMM' end time
var hasTeeTime = function(data, callback) {
  Schedule.findOne({ courseId: data.courseId, date: data.date }, function(error, schedule){
    if (error) {
      return callback && callback(error, null);
    }
    // This is stupid but required. messing with the array live changes it's length causing endless grief.
    // Instead, we build a new 'avail' array and attach it after the scan ...
    var availableTeeTimes = [];
    if (schedule === null) return callback(null, null);
    for (var i = 0; i < schedule.teetimes.length; i++) {
      if (schedule.teetimes[i].reserved === false && schedule.teetimes[i].time > data.start && schedule.teetimes[i].time < data.end) {
        availableTeeTimes.push(schedule.teetimes[i]);
      }
    }
    schedule.teetimes = availableTeeTimes;
    return callback && callback(null, schedule);
  });
};

// userId
// teetimeId
var bookTeeTime = function(data, callback) {
  console.log("data input to bookTeeTime:", data);
  Schedule.findOne({ "teetimes._id": data.teetimeId }, function(error, schedule){
    if (error) {
      return callback && callback(error, null);
    }
    if (schedule == null) {
      return callback && callback("Tee time not available", null);
    }

    for (var i = 0; i < schedule.teetimes.length; i++) {
      if (schedule.teetimes[i]._id.toString() === data.teetimeId) {
        schedule.teetimes[i].reserved = true;
        schedule.teetimes[i].reservedBy = data.cell;

        schedule.save(function(error, data){
          if (error) {
            console.log(error);
            return callback && callback(error, null);
          }
          //console.log("Tee time saved", data);

          return callback && callback(null, data);

        });
      }
    }

    // hahahahahahaha -- did u feel the async burn?
    // vvvvvvvvvvvvvv - bad dog!
    //return callback && callback('Could not update tee time.', null);


});

  //Schedule.update({ courseId: data.courseId, date: data.date, time: data.time}, function(error, schedule) {
  //  if (error) {
  //    return callback && callback(error, null);
  //  }
  //});
};

module.exports = {
  addSchedule: addSchedule,
  findSchedule: findSchedule,
  findSchedules: findSchedules,
  hasTeeTime: hasTeeTime,
  bookTeeTime: bookTeeTime
};
