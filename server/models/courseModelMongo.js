/**
 * Created by wayne on 2/13/15.
 */


var mongodb = require('../database/mongoDb');

var CourseSchema = new mongodb.Schema({
  name: String,
  description: String,
  location: {
    type: [Number],
    index: '2d'
  },
  address: String
});

CourseSchema.index({location: '2d'});

var Course = mongodb.model('Courses', CourseSchema);

// CourseSchema.methods.geoNear = function(loc){
//   console.log('in GeoNear');
//   return this.runCommand({
//     goeNear: "Courses",
//     //near: [37.783682, -122.409021]
//     near: loc,
//     spherical: true,
//     limit: 3
//   })
// };

module.exports = Course;