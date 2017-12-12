var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify');
var cleancss = require('gulp-clean-css');
var watch = require('gulp-watch');
var runsequence = require('run-sequence');
var browserSync = require('browser-sync')
var prettify = require('gulp-prettify');
var concat = require('gulp-concat');

var buildpath = 'build';
var docspath = 'docs';

//compile pug to html and update html
gulp.task('pug',function(){
  return gulp.src('templates/*.pug')
  .pipe(pug())
  .pipe(prettify())
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest(buildpath));
});

//compile sass to css and update css
gulp.task('sass', function(){
  return gulp.src('scss/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(cleancss())
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest(buildpath+'/css'))
  .pipe(gulp.dest(docspath+'/css'));
});

//update javascript
gulp.task('js', function(){
  return gulp.src([
    'js/classes.js',
    'js/form-module.js',
    'js/task-module.js',
    'js/storage-module.js',
    'js/template-module.js',
    'js/ui-module.js',
    'js/settings-module.js',
    'js/main-module.js'
  ])
  .pipe(concat('main.js'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest(buildpath+'/js'));
});

//update images
gulp.task('images' , function() {
  return gulp.src('images/**')
  .pipe(gulp.dest(buildpath+'/images'));
});

//start browsersync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {baseDir: 'build'},
    port: '8082'
  })
});

//update gitpages
gulp.task('docs', function() {
  return gulp.src(buildpath + '/**')
  .pipe(gulp.dest(docspath));
});

//start watch
gulp.task('watch', function(){
  runsequence('sass','pug','js','images','browserSync');
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('templates/*.pug', ['pug']);
  gulp.watch('js/*.js', ['js']);
});
