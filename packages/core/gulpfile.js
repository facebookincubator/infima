/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const rtlcss = require('gulp-rtlcss');
const postcssPresetInfima = require('postcss-preset-infima');
const webserver = require('gulp-webserver');

function transformStyles() {
  const modernPreset = postcssPresetInfima();
  return gulp
    .src('./styles/themes/**/*.pcss')
    .pipe(postcss(modernPreset.plugins, {syntax: modernPreset.syntax}))
    .pipe(rename({extname: '.css'}))
    .pipe(gulp.dest('./dist/css'));
}

function createRtlStyles() {
  return gulp
    .src('./dist/css/**/*.css')
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./dist/css'));
}

function transformScripts() {
  // Only copy for now. In future run through Babel.
  return gulp.src('./js/**/*.js').pipe(gulp.dest('./dist/js'));
}

function minifyStyles() {
  return gulp
    .src('./dist/css/**/*[!.min].css')
    .pipe(rename({suffix: '.min'}))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('./dist/css'));
}

function minifyScripts() {
  return gulp
    .src('./dist/js/**/*[!.min].js')
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'));
}

function copyStylesToDemo() {
  return gulp.src('./dist/css/**/*.css').pipe(gulp.dest('./demo/css'));
}

function copyScriptsToDemo() {
  return gulp.src('./dist/js/**/*.js').pipe(gulp.dest('./demo/js'));
}

function serve() {
  return gulp.src('./demo').pipe(
    webserver({
      livereload: {
        enable: true,
        filter: () => true,
      },
      open: true,
    }),
  );
}

function clean() {
  return del(['./dist/**/*', './demo/css/**', './demo/js/**']);
}

const transformAssets = gulp.parallel(
  gulp.series(transformStyles, createRtlStyles),
  transformScripts,
);
const copyAssetsToDemo = gulp.parallel(copyStylesToDemo, copyScriptsToDemo);
const minifyAssets = gulp.parallel(minifyStyles, minifyScripts);

const transformMinifyAndCopy = gulp.series(
  transformAssets,
  minifyAssets,
  copyAssetsToDemo,
);

function watch(cb) {
  gulp.watch(
    ['./styles/**/*.pcss'],
    gulp.series(transformStyles, copyStylesToDemo),
  );
  gulp.watch(
    ['./js/**/*.js'],
    gulp.series(transformScripts, copyScriptsToDemo),
  );
  cb();
}

exports.clean = clean;
exports.build = gulp.series(clean, transformMinifyAndCopy);
exports.default = gulp.series(clean, transformMinifyAndCopy, serve, watch);
