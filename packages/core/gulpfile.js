'use strict';

const autoprefixer = require('autoprefixer');
const cssVariables = require('postcss-css-variables');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

function sassTask() {
  return (
    gulp
      .src('./scss/themes/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([autoprefixer()]))
      .pipe(gulp.dest('./dist'))
      // Compile CSS variables to its values for IE11 support.
      .pipe(rename({ suffix: '.compat' }))
      .pipe(postcss([cssVariables()]))
      .pipe(gulp.dest('./dist'))
  );
}

function minify() {
  return gulp
    .src('./dist/**/*.css')
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('./dist'));
}

function copyStyles() {
  return gulp.src('./dist/**/*.css').pipe(gulp.dest('./demo/css'));
}

function copyScripts() {
  return gulp.src('./js/**/*.js').pipe(gulp.dest('./demo/js'));
}

function serve() {
  return gulp.src('./demo').pipe(
    webserver({
      livereload: true, // Not working. Figure out why.
      open: true,
    }),
  );
}

function clean() {
  return del(['./dist/**/*', './demo/css/**', './demo/js/**']);
}

const copyFiles = gulp.parallel(copyStyles, copyScripts);
const compileAndCopy = gulp.series(sassTask, copyFiles);

function watch(cb) {
  gulp.watch(['./scss/**/*.scss'], compileAndCopy);
  cb();
}

exports.clean = clean;
exports.build = gulp.series(clean, gulp.series(sassTask, minify, copyFiles));
exports.default = gulp.series(clean, watch, compileAndCopy, serve);
