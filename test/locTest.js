// var mongoose = require('mongoose');
var expect = require('chai').expect;
var db = require("../server/database/mongoDb.js");
var Q = require('q');
var Course = require("../server/models/courseModelMongo.js");
var CourseController = require("../server/controllers/courseController.js");

var q_findOne = Q.nbind(Course.findOne, Course);
var q_create = Q.nbind(Course.create, Course);
var q_find   = Q.nbind(Course.find, Course);

//Reminder: find, then remove;
var fiveCourses = [
  {
    name: "Presidio Golf Course",
    description: "test",
    address: "300 Finley Road, San Francisco, CA 94129",
    location : {
      type: "Point",
      coordinates: [37.788773, -122.460603]
    }
  },
  {
    name: "TPC Harding Park",
    description: "test",
    address: "99 Harding Rd, San Francisco, CA 94132",
    location : {
      type: "Point",
      coordinates: [37.724035, -122.492532]
    }
  },
  {
    name: "John McLaren Park",
    description: "test",
    address: "100 John F Shelley Dr, San Francisco, CA 94134",
    location : {
      type: "Point",
      coordinates: [37.719146, -122.421121]
    }
  },
  {
    name: "Lake Merced Golf Club",
    description: "test",
    address: "2300 Junipero Serra Blvd, Daly City, CA 94015",
    location : {
      type: "Point",
      coordinates: [37.697689, -122.477425]
    }
  },
  {
    name: "Cypress Golf Course",
    description: "test",
    address: "2001 Hillside Blvd, Colma, CA 94014",
    location : {
      type: "Point",
      coordinates: [37.680573, -122.446698]
    }
  }
];
console.log('type of inserted coordinates :   ::: ');
console.log(typeof fiveCourses[1].location.coordinates[1]);


describe('Integration Testing: CRUD Functions & Geospatial : ', function(){

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

  describe('inserting 5 local SF golf courses', function(){

    it('should insert 5 courses', function(done){
      var tasks = [];
      for (var i = 0 ; i < fiveCourses.length; i++){
        tasks.push(q_create(fiveCourses[i]));
      }

      Q.all(tasks)
        .then(function(results){
          // console.log("results: ",results);
          expect(results.length).to.equal(5);
          done();
        }, function(err){
          console.log("error :", err);
        });
    })

  });

  describe('querying for nearest golf courses',function(){
    it('successfuly queries using geoNear', function(done){
      var newPoint = {type: 'Point', location: [37.783682, -122.409021]}
      Course.geoNear(
        {type: "Point", coordinates: [37.783682, -122.409021]}, 
        {
          spherical: true, 
          maxDistance: 1 / 6378137, 
          distanceMultiplier: 6378137
        })
        .then(function (results) {
          console.log('results :', results);
          done();
        });

        // .then(function(found){
        //   console.log('in then success case : ')
        //   console.log('found :', found);
        //   done();
        // }, function(err){
        //   console.log('in then fail case : ')
        //   console.log('err :', err);
        //   done();
        // });
    });

  })

  xdescribe('using supertest to query for 3 nearest',function(){

  });
});