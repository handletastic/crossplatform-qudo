//variables
var gulp = require('gulp');
var less = require('gulp-less');
var minify = require('gulp-minify');
var watch = require('gulp-watch');
var pug = require('gulp-pug');
var prettify = require('gulp-prettify');
var browsersync = require('browser-sync');
var runsequence = require('run-sequence');

/* #### less to css #### */
gulp.task('less', function(){
  return gulp.src('less/*.less')
  .pipe(less())
  .pipe(minify())
  .pipe(gulp.dest('build'))
  .pipe(browsersync.reload({stream: true}))
});

/* #### pug to html #### */
gulp.task('pug', function(){
  return gulp.src('templates/*.pug')
  .pipe(pug())
  .pipe(prettify())
  .pipe(gulp.dest('build'))
  .pipe(browsersync.reload({stream:true}))
});

/* #### refresh browser #### */
gulp.task('browsersync', function(){
  browsersync.init({server: {baseDir: 'build'}
  });
});

/* #### watch folder/file changes #### */
gulp.task('watch', function(){
  runsequence('pug', 'less', 'browsersync', function(){});
  gulp.watch('less/*.less',['less']);
  gulp.watch('templates/*.pug', ['pug']);
});
