/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const autoprefixer = require('autoprefixer');
const postcssEach = require('postcss-each');
const postcssEasyImport = require('postcss-easy-import');
const postcssFor = require('postcss-for');
const postcssPresetEnv = require('postcss-preset-env');
const postcssStripInlineComments = require('postcss-strip-inline-comments');
const postcssNested = require('postcss-nested');
const postcssNestedAncestors = require('postcss-nested-ancestors');
const scss = require('postcss-scss');

module.exports = options => {
  const isCompatMode = options && options.compat;

  return {
    plugins: [
      autoprefixer(),
      postcssEasyImport({ prefix: '_' }),
      postcssStripInlineComments,
      postcssEach,
      postcssFor,
      postcssNestedAncestors,
      postcssNested,
      postcssPresetEnv({
        stage: 1,
        features: {
          'color-mod-function': { unresolved: 'warn' },
          'custom-properties': false,
        },
      }),
      isCompatMode && require('postcss-css-variables'),
    ].filter(Boolean),
    syntax: scss,
  };
};
