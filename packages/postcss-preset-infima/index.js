/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const postcssEach = require('postcss-each');
const postcssImport = require('postcss-import');
const postcssFor = require('postcss-for');
const postcssPresetEnv = require('postcss-preset-env');
const postcssStripInlineComments = require('postcss-strip-inline-comments');
const postcssNested = require('postcss-nested');
const postcssNestedAncestors = require('postcss-nested-ancestors');
const postcssMixins = require('postcss-mixins');
const postcssCombineDuplicatedSelectors = require('postcss-combine-duplicated-selectors');
const postcssSortMediaQueries = require('postcss-sort-media-queries');
const scss = require('postcss-scss');

module.exports = (options) => ({
  plugins: [
    postcssImport,
    postcssStripInlineComments,
    postcssEach,
    postcssFor,
    postcssNestedAncestors,
    postcssNested,
    postcssPresetEnv({
      stage: 1,
      features: {
        'color-mod-function': { unresolved: 'ignore' },
        'custom-properties': false,
      },
    }),
    postcssMixins({
      mixins: {
        transition: (mixin, properties, duration, timing) => {
          duration = duration || 'var(--ifm-transition-fast)';
          timing = timing || 'var(--ifm-transition-timing-default)';

          if (properties.includes(' ')) {
            return {
              'transition-property': properties.replace(/\s/g, ', '),
              'transition-duration': duration,
              'transition-timing-function': timing,
            }
          } else {
            return {
              transition: [properties, duration, timing].join(' ')
            }
          }
        }
      }
    }),
    postcssSortMediaQueries,
    postcssCombineDuplicatedSelectors,
  ].filter(Boolean),
  syntax: scss,
});
