var expect = require('chai').expect;
var db = require("../server/database/mongoDb.js");
var Q = require('q');
var Course = require("../server/models/courseModelMongo.js");
var CourseController = require("../server/controllers/courseController.js");

var q_findOne = Q.nbind(Course.findOne, Course);
var q_create = Q.nbind(Course.create, Course);
var q_find   = Q.nbind(Course.find, Course);

//multiply by this number
var radConvertor = {
  toMiles : Math.PI*3959/180
}

//Reminder: find, then remove;
var fiveCourses = [
  {
    name: "Presidio Golf Course",
    description: "test",
    address: "300 Finley Road, San Francisco, CA 94129",
    location : [37.788773, -122.460603]
  },
  {
    name: "TPC Harding Park",
    description: "test",
    address: "99 Harding Rd, San Francisco, CA 94132",
    location : [37.724035, -122.492532]
  },
  {
    name: "John McLaren Park",
    description: "test",
    address: "100 John F Shelley Dr, San Francisco, CA 94134",
    location : [37.719146, -122.421121]
  },
  {
    name: "Lake Merced Golf Club",
    description: "test",
    address: "2300 Junipero Serra Blvd, Daly City, CA 94015",
    location : [37.697689, -122.477425]
  },
  {
    name: "Cypress Golf Course",
    description: "test",
    address: "2001 Hillside Blvd, Colma, CA 94014",
    location : [37.680573, -122.446698]
  }
];

describe('Integration Testing: CRUD Functions & Geospatial : ', function(){

  describe('inserting 5 local SF golf courses', function(){
    before(function(done){
      //delete 5
      q_find({description: "test"})
        .then(function(courses){
          console.log('courses.length : ', courses.length);
          for (var i = 0 ; i < courses.length; i ++){
            console.log('removing a course...');
            console.log(courses[i]);
            courses[i].remove();
          }
          done();
        });
        done();
    });

    it('should insert 5 courses', function(done){
      var tasks = [];
      for (var i = 0 ; i < fiveCourses.length; i++){
        tasks.push(q_create(fiveCourses[i]));
      }

      Q.all(tasks)
        .then(function(results){
          expect(results.length).to.equal(5);
          done();
        }, function(err){
          console.log("error :", err);
        });
    })

  });

  describe('querying for nearest golf courses',function(){
    it('successfuly queries using geoNear', function(done){
      Course.geoNear(
        {type: "Point", coordinates: [37.783682, -122.409021]}, 
        {
          // spherical: true, 
          // maxDistance: 1 / 6378137, 
          // distanceMultiplier: 6378137
        })
        .then(function (results) {
          console.log('length of results:', results.length);
          expect(results.length).to.equal(5);
          done();
        }, function(err){
          console.log(err);
        });

    });

    it('queries using geoNear, filtering for max distance', function(done){
      Course.geoNear(
        {type: "Point", coordinates: [37.783682, -122.409021]}, 
        {
          maxDistance: .08
        })
        .then(function (results) {
          for (var i = 0; i < results.length; i ++){
            console.log(i + " : distance :   "+ results[i].dis*radConvertor.toMiles + " miles");
          }
          // expect(results.length).to.equal(5);
          done();
        }, function(err){
          console.log(err);
        });
    });

    it('queries for 3', function(done){
      Course.geoNear(
        {type: "Point", coordinates: [37.783682, -122.409021]}, 
        {
          maxDistance: 10*180/(Math.PI*3959),
          num: 3
        })
        .then(function (results) {
          console.log('inside then');
          for (var i = 0; i < results.length; i ++){
            console.log(i + " : distance :   "+ results[i].dis*radConvertor.toMiles + " miles");
          }
          expect(results.length).to.equal(3);
          done();
        }, function(err){
          console.log(err);
        });
    });
  });

  xdescribe('it queries for 3 nearest',function(){
  });
});