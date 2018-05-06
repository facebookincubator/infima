'use strict';

const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

gulp.task('sass', function() {
  return gulp
    .src('./scss/themes/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
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
