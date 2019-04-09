'use strict';

const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

function sassTask() {
  return gulp
    .src('./scss/themes/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('./css'));
}

function serveTask(cb) {
  return gulp.src('./').pipe(
    webserver({
      livereload: true,
      open: true,
    }),
  );
}

gulp.watch(['./scss/**/*.scss'], {}, sassTask);

exports.default = gulp.series(sassTask, serveTask);
