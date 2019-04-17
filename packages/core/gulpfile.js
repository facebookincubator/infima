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
    .pipe(gulp.dest('./dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist'));
}

function copyStylesTask() {
  return gulp.src('./dist/**/*.css').pipe(gulp.dest('./demo/css'));
}

function copyScriptsTask() {
  return gulp.src('./js/**/*.js').pipe(gulp.dest('./demo/js'));
}

const copyFilesTask = gulp.parallel(copyStylesTask, copyScriptsTask);

function serveTask(cb) {
  return gulp.src('./demo').pipe(
    webserver({
      livereload: true,
      open: true,
    }),
  );
}

const compileAndCopy = gulp.series(sassTask, copyFilesTask);

gulp.watch(['./scss/**/*.scss'], {}, compileAndCopy);

exports.default = gulp.series(compileAndCopy, serveTask);
