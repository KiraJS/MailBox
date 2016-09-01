'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  webserver = require('gulp-webserver');

gulp.task('js', function() {
  gulp.src([
      'builds/dev/app/**/*.js',
      '!builds/dev/app/**/*.test.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('builds/dev'));
  gulp.src([
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/angular-mocks/angular-mocks.js'
    ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('builds/dev'));
})

gulp.task('css', function() {
  gulp.src('builds/dev/app/**/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('builds/dev'));
  gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.css',
    ])
    .pipe(concat('theme.css'))
    .pipe(gulp.dest('builds/dev'));
})

gulp.task('watch', function() {
  gulp.watch('builds/dev/app/**/*.js', ['js']);
  gulp.watch('builds/dev/app/**/*.css', ['css']);
})

gulp.task('webserver', function() {
  gulp.src('builds/dev')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8035,
    }));
})

gulp.task('default', [
  'js',
  'css',
  'watch',
  'webserver'
]);
