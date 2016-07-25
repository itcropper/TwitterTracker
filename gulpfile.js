var gulp = require('gulp');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var less = require('gulp-less');
var path = require('path');
 
gulp.task('bower', function() {
  return bower('./bower_components')
    .pipe(gulp.dest('lib/'))
});


var paths = {
  scripts: ['bower_components/**/dist/**/*.min.js', 'assets/scripts/*.js'],
  styles: ['assets/styles/*.css', 'assets/styles/*.less', 'lib/**/dist/**/*.less', 'lib/**/dist/**/*.css'],
  images: 'assets/img/**/*'
};
 
// Not all tasks need to use streams 
// A gulpfile is just another node program and you can use any package available on npm 
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  return del(['build']);
});
 
gulp.task('scripts', ['clean'], function() {
  
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/dist/js'));   
});

gulp.task('less', function () {
  return gulp.src(paths.styles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('assets/dist/styles'));
});

 
// Copy all static images 
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task 
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});
 
// Rerun the task when a file changes 
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});
 
// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'less', 'images']);