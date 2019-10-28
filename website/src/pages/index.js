/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Layout from '@theme/Layout';

function Home() {
  return (
    <Layout title="Infima">
      <div class="hero hero--primary text--center">
        <div class="container">
          <h1 class="hero__title">Infima</h1>
          <p class="hero__subtitle">
            A UI framework for content-centric websites.
          </p>
          <div>
            <Link
              class="button button--secondary button--outline button--lg"
              to={useBaseUrl('docs/getting-started/introduction')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
