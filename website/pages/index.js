import React, { useContext } from 'react';
import Link from '@docusaurus/Link';
import withBaseUrl from '@docusaurus/withBaseUrl';

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
              to={withBaseUrl('docs/getting-started/introduction')}
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
