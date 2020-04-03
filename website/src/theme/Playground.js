/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import prettier from 'prettier/standalone';
import babelParser from 'prettier/parser-babylon';
import CodeBlock from '@theme/CodeBlock';

function Playground(props) {
  const htmlString = prettier
    .format(ReactDOMServer.renderToStaticMarkup(props.children), {
      parser: 'babel',
      plugins: [babelParser],
    })
    .replace(/[;\s]+$/, ''); // Remove semicolon added by Prettier.

  return (
    <div>
      <div
        {...props.componentContainerProps}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
      <br />
      <CodeBlock className="html">{htmlString}</CodeBlock>
    </div>
  );
}

export default Playground;
