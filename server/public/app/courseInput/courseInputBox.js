//Import npm modules because we're using browserify to build the app
var React = require('react');
var Bootstrap = require('react-bootstrap');
var Router = require('react-router');
var parse = require('url-parse');


//Create aliases for react-router module components
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;


//Create aliases for react-bootstrap module components
var Alert = Bootstrap.Alert;
var Label = Bootstrap.Label;


//TeeTime is the lowest level child of the detail view
//Renders each tee time, main phone number reserved, and confirmed friends

var TeeTime = React.createClass({

  render: function() {
    return (
      <div className="teeTime">
        <h1>
        {this.props.time}
          //Uses react-bootstrap for styling
          <Label bsStyle="success">{this.props.reserved}</Label>
          <Label bsStyle="info">{this.props.players[0]}</Label>
          <Label bsStyle="info">{this.props.players[1]}</Label>
          <Label bsStyle="info">{this.props.players[2]}</Label>
          <Label bsStyle="info">{this.props.players[3]}</Label>
        </h1>
      </div>
    );
  }

});


//TeeTimes is the parent class to TeeTime
//Renders a tee time class for every teeTime on the server
var TeeTimes = React.createClass({

  render: function() {
    var teeTimeNodes = this.props.teeTimes.map(function(teeTime){
      return (
        <TeeTime time={teeTime.time} reserved={teeTime.reservedBy} players={teeTime.players}>
          {teeTime.players}
        </TeeTime>
      );
    });
    return (
      <div className="teeTimeList Detail">
        {teeTimeNodes}
      </div>
    );
  }

});


//Course is the lowest level child of the master
//Renders each course on the left side of the page
var Course = React.createClass({

  render: function() {
    return (
      <div className="course">
        <Alert bstyle="warning">
          {this.props.name}
        </Alert>
      </div>
    );
  }

});


//CourseList is the parent class to Course
//Renders a course for every course on the server
//Each course is rendered as a Link, from the react-router
var CourseList = React.createClass({

  render: function(){
    var courseNodes = this.props.data.map(function(course){
      return (
        <Link to="course" params={{ id: course._id }} >
          <Course name={course.name} address={course.address}>
            {course.description}
          </Course>
        </Link>
      );

    });
    return (
      <div className="courseList Master">
        {courseNodes}
      </div>
    );
  }

});


//Course form is a react input field for updating the server
//This was for prototype purposes, and scope changed
//Not used, but available for future
var CourseForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();

    //Create refs for all input data
    var name = this.refs.name.getDOMNode().value.trim();
    var address = this.refs.address.getDOMNode().value.trim();
    var description = this.refs.description.getDOMNode().value.trim();

    //If no data exists, return
    if (!name ||  !address || !description) {
      return;
    }

    //on submit, we send a json object
    this.props.onCourseSubmit({name: name, address: address, description: description});

    //Set all dom nodes to an empty string
    this.refs.name.getDOMNode().value = '';
    this.refs.address.getDOMNode().value = '';
    this.refs.description.getDOMNode().value = '';

  },

  render: function(){
    return(
      <form className="courseForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Course name" ref="name"/>
      <input type="text" placeholder="Location (City, ST)" ref="address"/>
      <input type="text" placeholder="Description" ref="description"/>
      <input type="submit" value="Create new course" />
      </form>

    );
  }
});


//CourseBox is the parent class for all submodules
//

var CourseBox = React.createClass({

  getInitialState: function(){
    return {data: [], teeTimes: []}
  },

  //HTTP requests to the api for courses
  loadCoursesFromServer: function() {
    $.ajax({
      url: "/api/course",
      dataType: 'json',
      success: function(data){
        this.setState({data: data});
      }.bind(this), //why bind this?
      //Must be a react thing to set the context of the callback
      error: function(xhr, status, err){
        console.error("localhost:1337/api/course", status, err.toString());
      }.bind(this)
    });
  },

  //HTTP requests to the api for courses
  loadTeeTimesFromServer: function() {
    var newQuery = parse(document.URL).hash.slice(1);

    $.ajax({
      url: newQuery,
      dataType: 'json',
      success: function(data){
        this.setState({teeTimes: data.teetimes});
      }.bind(this), //why bind this?
      //Must be a react thing to set the context of the callback
      error: function(xhr, status, err){
        console.error("localhost:1337/api/schedule/54f4b9efe331e4ca1e261e39/03012015", status, err.toString());
      }.bind(this)
    });
  },

  //Not used. Handles new course submission
  handleCourseSubmit: function(course){
    var courses = this.state.data;
    var newCourse = courses.concat([course]);
    this.setState({data: newCourse});

    $.ajax({
      url: '/api/course/',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(course),
      headers: { 'Content-Type': 'application/json' },
      success: function(data){
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err){
        console.error("localhost:8080/api/course/", status, err.toString())
      }.bind(this)
    });
  },

  //Initial HTTP requests on load
  componentDidMount: function(){
    this.loadCoursesFromServer();
    this.loadTeeTimesFromServer();
    //Sets up server polling for teeTimes
    setInterval(this.loadTeeTimesFromServer, 1000)
  },

  //Renders CourseList and TeeTimes
  render: function(){
    return(
      <div className="courseBox" className="App">
      <CourseList data={this.state.data}/>
      <TeeTimes teeTimes={this.state.teeTimes}/>
      </div>
    );
  }
});

//Sets path for course links to match course ID for HTTP calls
var routes = (
  <Route handler={CourseBox}>
    <Route name="course" path="/api/schedule/:id/03012015" handler={CourseBox} />
  </Route>
)

//Runs the router
Router.run(routes, function(Handler){
  React.render(<Handler/>, document.getElementById('content'))
});
