var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var userRouter = require('./routes/userRouter');
var courseRouter = require('./routes/courseRouter');
var scheduleRouter = require('./routes/scheduleRouter');
var coreRouter = require('./routes/coreRouter');
var seedRouter = require('./routes/seedRouter');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


app.use('/api', coreRouter);
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/schedule', scheduleRouter);

// delete before deployment - seeds database tables (collections)
app.use('/api/seed', seedRouter);

app.use('/courseInput',express.static(__dirname + "/public" ));
app.use('/',express.static(__dirname));

console.log("Assigning Port...")
var port = process.env.PORT || 8080;
console.log("Port...", port);
app.listen(port);
console.log("Listening on...", port);
