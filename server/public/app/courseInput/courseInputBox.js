var React = require('react');
var Bootstrap = require('react-bootstrap');
var Router = require('react-router');
var parse = require('url-parse');


var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Alert = Bootstrap.Alert;
var Label = Bootstrap.Label;


var TeeTime = React.createClass({
  render: function() {
    //console.log("check",this.props.reservedBy,this.props.players)
    return (
      <div className="teeTime">
      <h1>
      {this.props.time}
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
  handleClick: function() {
    console.log("link clicked");
  },

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


  getInitialState: function(){
    return {data: [], teeTimes: []}
  },

  loadCoursesFromServer: function() {
    $.ajax({
      url: "/api/course",
      dataType: 'json',
      success: function(data){
        //console.log("successful course load from server", data)

        this.setState({data: data});
      }.bind(this), //why bind this?
      //Must be a react thing to set the context of the callback
      error: function(xhr, status, err){
        console.error("localhost:1337/api/course", status, err.toString());
      }.bind(this)
    });
  },

  loadTeeTimesFromServer: function() {
    //console.log("loading Tee Times", document.URL, parse(document.URL).hash);
    //console.log("path",  parse(document.URL).hash.slice(1) );

    var newQuery = parse(document.URL).hash.slice(1);

    $.ajax({
      url: newQuery,
      dataType: 'json',
      success: function(data){
        //console.log("load tee times from server", data);
        //console.log("check the teetimes property", data.teetimes);

        this.setState({teeTimes: data.teetimes});
      }.bind(this), //why bind this?
      //Must be a react thing to set the context of the callback
      error: function(xhr, status, err){
        console.error("localhost:1337/api/schedule/54f4b9efe331e4ca1e261e39/03012015", status, err.toString());
      }.bind(this)
    });
  },

  handleClick: function(){
    this.loadTeeTimesFromServer();
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


  //TODO:
  //write a handle route function?
  //Get the course data
  //Somehow bind the course ids to the data
  //So that the course ID can be used to make an api request
  //To get tee times.

  componentWillMount: function(){
    console.log("will mount", this);
  },


  componentDidMount: function(){
    this.loadCoursesFromServer();
    this.loadTeeTimesFromServer();

    //console.log("did mount", this.state)

    //setInterval(this.loadCoursesFromServer, 20000)
    setInterval(this.loadTeeTimesFromServer, 1000)
  },

  render: function(){

    //console.log("render!!! ", this.state.teeTimes)

    return(
      <div className="courseBox" className="App">
      <CourseList data={this.state.data}/>
      <TeeTimes teeTimes={this.state.teeTimes}/>
      </div>
    );
  }
});

var routes = (
  <Route handler={CourseBox}>
    <Route name="course" path="/api/schedule/:id/03012015" handler={CourseBox} />
  </Route>
)

Router.run(routes, function(Handler){
  React.render(<Handler/>, document.getElementById('content'))
})

// React.render(
//   <CourseBox url="api/course/" pollInterval={20000} />,
//   document.getElementById('content')
// );
