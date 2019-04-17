'use strict';

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const postcssCssVariables = require('postcss-css-variables');
const postcssEach = require('postcss-each');
const postcssEasyImport = require('postcss-easy-import');
const postcssFor = require('postcss-for');
const postcssPresetEnv = require('postcss-preset-env');
const postcssStripInlineComments = require('postcss-strip-inline-comments');
const scss = require('postcss-scss');
const webserver = require('gulp-webserver');

function processStyles() {
  return (
    gulp
      .src('./styles/themes/**/*.css', {
        ignore: [
          '**/_*', // Exclude files starting with '_'.
          '**/_*/**', // Exclude entire directories starting with '_'.
        ],
      })
      .pipe(
        postcss(
          [
            postcssEasyImport({ prefix: '_' }),
            postcssStripInlineComments,
            postcssEach,
            postcssFor,
            postcssPresetEnv({
              stage: 1,
              features: {
                'color-mod-function': { unresolved: 'warn' },
              },
            }),
          ],
          {
            syntax: scss, // Needed for parser to be able to parse double-slash comments.
          },
        ),
      )
      .pipe(gulp.dest('./dist'))
      // Compile CSS variables to its values for IE11 support.
      .pipe(rename({ suffix: '.compat' }))
      .pipe(postcss([postcssCssVariables()]))
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
const compileAndCopy = gulp.series(processStyles, copyFiles);

function watch(cb) {
  gulp.watch(['./styles/**/*.css'], compileAndCopy);
  cb();
}

exports.clean = clean;
exports.build = gulp.series(
  clean,
  gulp.series(processStyles, minify, copyFiles),
);
exports.default = gulp.series(clean, watch, compileAndCopy, serve);
