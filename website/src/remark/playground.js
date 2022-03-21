/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const visit = require('unist-util-visit');

const codeBlockTitleRegex =
  /containerClassName=(?<quote>["'])(?<containerClassName>.*?)\1/;

module.exports = function plugin() {
  const transformer = (root) => {
    visit(root, 'code', (node, index, parent) => {
      if (node.lang === 'html') {
        const containerClassName =
          node.meta?.match(codeBlockTitleRegex)?.groups.containerClassName;
        parent.children.splice(parent.children.indexOf(node), 0, {
          type: 'jsx',
          value: `<div${
            containerClassName ? ` className="${containerClassName}"` : ' '
          } dangerouslySetInnerHTML={{__html: \`${node.value}\`}}/><br />`,
        });
        return index + 2;
      }
    });
  };
  return transformer;
};
