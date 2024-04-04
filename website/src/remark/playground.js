/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {visit} from 'unist-util-visit';

const codeBlockTitleRegex =
  /containerClassName=(?<quote>["'])(?<containerClassName>.*?)\1/;

module.exports = function plugin() {
  const transformer = (root) => {
    visit(root, 'code', (node, index, parent) => {
      if (node.lang === 'html') {
        const containerClassName =
          node.meta?.match(codeBlockTitleRegex)?.groups.containerClassName;

        const html = node.value;

        const playgroundElement = {
          type: 'mdxJsxFlowElement',
          name: 'div',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'className',
              value: containerClassName,
            },
            {
              type: 'mdxJsxAttribute',
              name: 'dangerouslySetInnerHTML',
              value: {
                type: 'mdxJsxAttributeValueExpression',
                data: {
                  estree: {
                    type: 'Program',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'ObjectExpression',
                          properties: [
                            {
                              type: 'Property',
                              kind: 'init',
                              key: {
                                type: 'Identifier',
                                name: '__html',
                              },
                              value: {
                                type: 'Literal',
                                value: `\`${html}\``,
                                raw: `\`${html}\``,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        };

        const lineBreakElement = {
          type: 'mdxJsxFlowElement',
          name: 'br',
        };

        const elementsToInsert = [playgroundElement, lineBreakElement];

        parent.children.splice(
          parent.children.indexOf(node),
          0,
          ...elementsToInsert,
        );

        return index + elementsToInsert.length + 1;
      }
    });
  };
  return transformer;
};
