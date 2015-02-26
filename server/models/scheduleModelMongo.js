/**
 * Created by wayne on 2/13/15.
 */

var mongodb = require('../database/mongoDb');

var ScheduleSchema = new mongodb.Schema({
  courseId: mongodb.Schema.Types.ObjectId,
  date: String,
  teetimes: [{
    time: String,
    reserved: Boolean,
    numPlayers: Number,
    reservedBy: String,
    players: [String]
  }]
});

var Schedule = mongodb.model('Schedules', ScheduleSchema);

module.exports = Schedule;
