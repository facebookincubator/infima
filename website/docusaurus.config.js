/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-check

// See Netlify env variables here: https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
const isNetlify = process.env.NETLIFY === 'true';
const isNetlifyDeployPreview =
  isNetlify && process.env.CONTEXT === 'deploy-preview';

// Deploy preview: we want to test the Infima RTL support!
/** @type {import("@docusaurus/types").I18nConfig} */
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

/** @type {import("@docusaurus/types").Config} */
const config = {
  i18n,
  title: 'Infima',
  tagline: 'A modern styling framework for content-driven websites 🔥',
  organizationName: 'facebookincubator',
  projectName: 'infima',
  baseUrl: '/',
  url: 'https://infima.dev',
  favicon: 'img/logo.png',
  /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
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
          /** @type {"left" | "right"} */
          position: 'left',
        },
        isNetlifyDeployPreview && {
          to: 'pathname:///demo',
          label: 'Demo',
          /** @type {"left" | "right"} */
          position: 'left',
        },
        isNetlifyDeployPreview && {
          type: 'localeDropdown',
          /** @type {"left" | "right"} */
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
              href: 'https://opensource.fb.com/legal/privacy/',
              target: '_blank',
              rel: 'noreferrer noopener',
            },
            {
              label: 'Terms',
              href: 'https://opensource.fb.com/legal/terms/',
              target: '_blank',
              rel: 'noreferrer noopener',
            },
          ],
        },
      ],
      logo: {
        alt: 'Meta Open Source Logo',
        // This default includes a positive & negative version, allowing for
        // appropriate use depending on your site's style.
        src: '/img/meta_opensource_logo_negative.svg',
        href: 'https://opensource.fb.com',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Meta Platforms, Inc.`,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [require('./src/remark/playground')],
        },
        blog: false,
      }),
    ],
  ],
};

module.exports = config;
