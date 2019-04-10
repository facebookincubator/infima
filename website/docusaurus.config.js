/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Infima',
  tagline: 'UI framework for content-driven websites 🔥',
  organizationName: 'yangshun',
  projectName: 'infima',
  baseUrl: '/',
  url: 'https://infima-dev.netlify.com',
  headerLinks: [
    { doc: 'navbar', label: 'Docs' },
    {
      href: 'https://github.com/facebook/docusaurus',
      label: 'GitHub',
    },
  ],
  headerIcon: '',
  favicon: '',
  plugins: [
    {
      name: '@docusaurus/plugin-content-docs',
      options: {
        path: './docs',
        sidebarPath: require.resolve('./sidebars.json'),
      },
    },
    {
      name: '@docusaurus/plugin-content-pages',
    },
    {
      name: '@docusaurus/plugin-sitemap',
    },
  ],
};
