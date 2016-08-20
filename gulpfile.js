'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver');

gulp.task('js',function(){
  gulp.src([
      'builds/dev/app/**/*.js',
      '!builds/dev/app/**/*_test.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('builds/dev'));
  gulp.src([
      'bower_components/angular/angular.js'
    ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('builds/dev'));
})

gulp.task('css', function(){
  gulp.src('builds/dev/app/**/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('builds/dev'));
  gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.css'
    ])
    .pipe(concat('theme.css'))
    .pipe(gulp.dest('builds/dev'));
})

gulp.task('watch', function(){
  gulp.watch('builds/dev/app/**/*.js', ['js']);
  gulp.watch('builds/dev/app/**/*.css', ['css']);
})

gulp.task('webserver', function(){
  gulp.src('builds/dev')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8034,
    }));
})

gulp.task('default', [
    'js',
    'css',
    'watch',
    'webserver'
  ]);
