'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const webserver = require('gulp-webserver');

gulp.task('sass', function() {
  return gulp
    .src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('serve', function() {
  gulp.src('./').pipe(
    webserver({
      livereload: true,
      open: true,
    }),
  );
});

gulp.task('default', ['sass', 'sass:watch', 'serve']);
