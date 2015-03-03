var React = require('react');
var Bootstrap = require('react-bootstrap');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Alert = Bootstrap.Alert;
var Label = Bootstrap.Label;


var TeeTime = React.createClass({
  render: function() {
    console.log(this.props.reservedBy,this.props.players)
    return (
      <div className="teeTime">
        <h1>
          {this.props.time} <Label bsStyle="success">{this.props.reserved}</Label>
        </h1>
      </div>
    );
  }
});

var TeeTimes = React.createClass({
  render: function() {
    var teeTimeNodes = this.props.data.map(function(teeTime){
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


var CourseList = React.createClass({
  render: function(){
    var courseNodes = this.props.data.map(function(course){
      return (
        <Course name={course.name} address={course.address}>
        {course.description}
        </Course>
      );

    });
    return (
      <div className="courseList Master">
      {courseNodes}
      </div>
    );
  }
});


//Not used
// <CourseForm onCourseSubmit={this.handleCourseSubmit} />

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

    console.log("handleSubmit Called");

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

//api/course/
//
//

var CourseBox = React.createClass({

  loadCoursesFromServer: function() {
    $.ajax({
      url: "/api/course",
      dataType: 'json',
      success: function(data){
        console.log(data)

        this.setState({data: data});
      }.bind(this), //why bind this?
      //Must be a react thing to set the context of the callback
      error: function(xhr, status, err){
        console.error("localhost:1337/api/course", status, err.toString());
      }.bind(this)
    });
  },

  loadTeeTimesFromServer: function(){
    $.ajax({
      url: "/api/schedule/54f4b9efe331e4ca1e261e39/03012015",
      dataType: 'json',

      success: function(data){
        console.log("Success! data", data.teetimes);
        this.setState({teeTimes : data.teetimes})
        console.log("Tee times!", this.state.teeTimes)
      }.bind(this),

      error: function(xhr, status, err){
        console.error("localhost:1337/api/course/:id/:date", status, err.toString())
      }.bind(this)
    })

  },


  handleCourseSubmit: function(course){
    //before the ajax request
    //lets just render the course
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

  getInitialState: function(){
    return {data: [], teeTimes: []}
  },

  //TODO:
  //write a handle route function?
  //Get the course data
  //Somehow bind the course ids to the data
  //So that the course ID can be used to make an api request
  //To get tee times.

  componentDidMount: function(){
    this.loadCoursesFromServer();
    this.loadTeeTimesFromServer();

    console.log("mount", this.state)

    setInterval(this.loadCoursesFromServer, 20000)
  },

  render: function(){
    console.log("render!!! ", this.state.teeTimes)
    return(
      <div className="courseBox" className="App">
      <CourseList data={this.state.data}/>
      <TeeTimes data={this.state.teeTimes}/>
      </div>
    );
  }
});

var routes = (
  <Route handler={CourseBox}>
  </Route>
)

Router.run(routes, function(Handler){
  React.render(<Handler/>, document.getElementById('content'))
})

// React.render(
//   <CourseBox url="api/course/" pollInterval={20000} />,
//   document.getElementById('content')
// );
