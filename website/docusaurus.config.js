/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See Netlify env variables here: https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
const isNetlify = process.env.NETLIFY === 'true';
const isNetlifyDeployPreview =
  isNetlify && process.env.CONTEXT === 'deploy-preview';

// Deploy preview: we want to test the Infima RTL support!
const i18n = isNetlifyDeployPreview
  ? {
      defaultLocale: 'LTR',
      locales: ['LTR', 'RTL'],
      localeConfigs: {
        LTR: {
          direction: 'ltr',
        },
        RTL: {
          direction: 'rtl',
        },
      },
    }
  : undefined;

module.exports = {
  i18n,
  title: 'Infima',
  tagline: 'A modern styling framework for content-driven websites 🔥',
  organizationName: 'facebookincubator',
  projectName: 'infima',
  baseUrl: '/',
  url: 'https://infima.dev',
  favicon: 'img/logo.png',
  themeConfig: {
    navbar: {
      title: 'Infima',
      logo: {
        alt: 'Infima Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs/getting-started/introduction',
          label: 'Docs',
          position: 'left',
        },
        isNetlifyDeployPreview && {
          to: 'pathname:///demo',
          label: 'Demo',
          position: 'left',
        },
        isNetlifyDeployPreview && {
          type: 'localeDropdown',
          position: 'left',
        },
      ].filter(Boolean),
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'docs/getting-started/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/infima',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebookincubator/infima',
            },
          ],
        },
        {
          title: 'Legal',
          // Please do not remove the privacy and terms, it's a legal requirement.
          items: [
            {
              label: 'Privacy',
              href: 'https://opensource.facebook.com/legal/privacy/',
              target: '_blank',
              rel: 'noreferrer noopener',
            },
            {
              label: 'Terms',
              href: 'https://opensource.facebook.com/legal/terms/',
              target: '_blank',
              rel: 'noreferrer noopener',
            },
          ],
        },
      ],
      logo: {
        alt: 'Facebook Open Source Logo',
        src: 'https://docusaurus.io/img/oss_logo.png',
        href: 'https://opensource.facebook.com',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
      },
    ],
  ],
};
