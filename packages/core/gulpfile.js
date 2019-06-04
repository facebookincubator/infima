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

function transformStyles() {
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
                'custom-properties': false,
              },
            }),
          ],
          {
            syntax: scss, // Needed for parser to be able to parse double-slash comments.
          },
        ),
      )
      .pipe(gulp.dest('./dist/css'))
      // Compile CSS variables to its values for IE11 support.
      .pipe(rename({ suffix: '.compat' }))
      .pipe(postcss([postcssCssVariables()]))
      .pipe(gulp.dest('./dist/css'))
  );
}

function transformScripts() {
  // Only copy for now. In future run through Babel.
  return gulp.src('./js/**/*.js').pipe(gulp.dest('./dist/js'));
}

function minifyStyles() {
  return gulp
    .src('./dist/css/**/*.css')
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('./dist/css'));
}

function minifyScripts() {
  return gulp
    .src('./dist/js/**/*.js')
    .pipe(rename({ suffix: '.min' }))
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
      livereload: true, // Not working. Figure out why.
      open: true,
    }),
  );
}

function clean() {
  return del(['./dist/**/*', './demo/css/**', './demo/js/**']);
}

const transformAssets = gulp.parallel(transformStyles, transformScripts);
const copyAssetsToDemo = gulp.parallel(copyStylesToDemo, copyScriptsToDemo);
const minifyAssets = gulp.parallel(minifyStyles, minifyScripts);
const transformAndCopy = gulp.series(transformAssets, copyAssetsToDemo);
const tranformMinifyAndCopy = gulp.series(
  transformAssets,
  minifyAssets,
  copyAssetsToDemo,
);

function watch(cb) {
  gulp.watch(
    ['./styles/**/*.css'],
    gulp.series(transformStyles, copyStylesToDemo),
  );
  gulp.watch(
    ['./js/**/*.js'],
    gulp.series(transformScripts, copyScriptsToDemo),
  );
  cb();
}

exports.clean = clean;
exports.build = gulp.series(clean, tranformMinifyAndCopy);
exports.default = gulp.series(clean, watch, transformAndCopy, serve);
