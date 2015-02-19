/**
 * Created by wayne on 2/14/15.
 */


var express = require('express');
var userRouter = express.Router();
var userController = require('../controllers/userController');


// base route will be /api/user

userRouter
  .get('/', function(request, response){

    userController.findUsers({}, function(error, users){
      if (error) {
        // TODO: pick HTTP status error
        return response.status(500).end(error);
      }
      if (users == null) {
        return response.status(404).end("User not found.");
      }
      response.status(200).json(users);
    });

  })
  .post('/', function(request, response){
    // TODO: error checking Wayne!
    userController.addUser(request.body, function(error, user){
      if (error) {
        return response.status(500).end(error);
      }
      // HTTP Status 201 - created
      response.status(201).json(user);
    });
  })
  .get('/:cell', function(request, response){
    userController.findUser({ cell: request.params.cell }, function(error, user){
      if (error) {
        return response.status(500).end(error);
      }
      if (user == null) {
        return response.status(404).end("User not found.");
      }
      response.status(200).json(user);
    });
  })
  // route for Toly
  //.get('/name/:name', function(request, response){
  //  userController.findUser({ first: request.params.name }, function(error, user){
  //    if (error) {
  //      response.status(400);
  //      return response.end(error);
  //    }
  //    response.json(user);
  //  });
  //})
  .put('/:cell', function(request, response){
    userController.updateUser({
      cell: request.params.cell
    }, request.body, function(error, rows){
      if (error) {
        return response.status(500).end(error);
      }
      response.status(200).json(rows);
    });
  })
  // CATCH-ALL for bad requests
  .get('*', function(request, response){
    // HTTP Bad Request 400
    return response.status(400).end();
  })
  .post('*', function(request, response){
    // HTTP Bad Request 400
    return response.status(400).end();
  })
  .put('*', function(request, response){
    // HTTP Bad Request 400
    return response.status(400).end();
  });



module.exports = userRouter;