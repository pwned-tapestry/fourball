var React = require('react');
var Bootstrap = require('react-bootstrap');

var Alert = Bootstrap.Alert;

var Course = React.createClass({
  render: function() {
    return (
      <div className="course">

      <Alert bstyle="warning">
      {this.props.name}
      </Alert>

      <h3 className="courseAddress">
      {this.props.address}
      </h3>

      {this.props.children}
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
      <div className="courseList">
      {courseNodes}
      </div>
    );
  }
});


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
      url: "/api/course/",
      dataType: 'json',
      success: function(data){
        console.log(data)

        this.setState({data: data});
      }.bind(this), //why bind this?
      //Must be a react thing to set the context of the callback
      error: function(xhr, status, err){
        console.error("localhost:8080/api/coursesWithTeeTimes", status, err.toString());
      }.bind(this)
    });
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
    return {data: []}
  },

  componentDidMount: function(){
    this.loadCoursesFromServer();
    setInterval(this.loadCoursesFromServer, this.props.pollInterval)
  },

  render: function(){
    return(
      <div className="courseBox">
      <h1>Open your course for a 4Ball</h1>
      <CourseList data={this.state.data}/>
      <CourseForm onCourseSubmit={this.handleCourseSubmit} />
      </div>
    );
  }
});

React.render(

  <CourseBox url="api/course/" pollInterval={20000} />,
  document.getElementById('content')
);
