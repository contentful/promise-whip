'use strict';

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var path   = require('path');

gulp.task('default', ['lint'], function () {});

gulp.task('lint', function () {
  gulp
    .src([
      path.resolve(__dirname, 'gulpfile.js'),
      path.resolve(__dirname, 'index.js'),
      path.resolve(__dirname, 'test', '**', '*.js')
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.instafailReporter());
});
