
var gulp = require('gulp');
//Bundles up js into a flat file for serving
var browserify = require('browserify');
//Transforms jsx to js
var reactify = require('reactify');
//Something from the tutorial I don't understand
var source = require('vinyl-source-stream');

var paths = {
  app : ['./app/courseInput/courseInputBox.js']
};

gulp.task('transform',function(){

  browserify(paths.app)
  .transform(reactify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./'));

})

gulp.task('default', ['transform']);

