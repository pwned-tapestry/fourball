/**
 * Created by wayne on 2/13/15.
 */


var mongodb = require('../database/mongoDb');

var CourseSchema = new mongodb.Schema({
  name: String,
  penis: 'hugantic',
  description: String,
  location: {
    type: "Point",
    coodinates: []},
  address: String
});

var Course = mongodb.model('Courses', CourseSchema);

mongodb.Course.ensureIndex({
  location: "2dsphere"
});

module.exports = Course;