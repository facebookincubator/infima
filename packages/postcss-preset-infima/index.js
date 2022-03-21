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
const postcssColorModFunction = require('postcss-color-mod-function');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const postcssNestedAncestors = require('postcss-nested-ancestors');
const postcssMixins = require('postcss-mixins');
const postcssCombineDuplicatedSelectors = require('postcss-combine-duplicated-selectors');
const postcssSortMediaQueries = require('postcss-sort-media-queries');

module.exports = () => ({
  plugins: [
    postcssImport,
    // TODO postcss-each v1 doesn't seem to be compatible due to color-mod.
    // Need to upgrade later
    postcssEach,
    postcssFor,
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
            };
          } else {
            return {
              transition: [properties, duration, timing].join(' '),
            };
          }
        },
      },
    }),
    postcssNestedAncestors,
    postcssNested,
    // color-mod has been removed from the spec, so it's not included in
    // preset-env. Using a separate plugin instead. We probably would eventually
    // get rid of color-mod
    postcssColorModFunction({unresolved: 'ignore'}),
    postcssPresetEnv({
      stage: 1,
      features: {
        'custom-properties': false,
      },
    }),
    postcssSortMediaQueries,
    postcssCombineDuplicatedSelectors,
  ].filter(Boolean),
});
