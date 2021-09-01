# [Infima](https://infima.dev/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebookincubator/infima/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/infima.svg?style=flat)](https://www.npmjs.com/package/infima)

> ⚠️ Infima is not yet ready for production use and is being developed alongside [Docusaurus 2](https://docusaurus.io/).

A modern styling framework for content-driven websites 🔥.

## Features

- **Theming** - Create websites with built-in support for theming and dark mode
- **Modern** - Built using modern CSS methodologies - CSS variables, PostCSS and BEM naming
- **Modular** - Import only the CSS for the components which you need

## Background

While building [Docusaurus 2](https://docusaurus.io/), we found that we needed styling for a documentation website as part of the default theme. We could bake the styling into the default theme such that it was only used by Docusaurus websites, but in the usual Facebook fashion, we decided to separate out the CSS layer into a separate project such that websites interested in adopting a documentation-site styling could use it too.

This project is being built alongside Docusaurus 2 and is still in the alpha stage, so using only this project in production is not recommended. Class names and CSS variable names might change in future (but will be documented in the CHANGELOG).

### License

Infima is [MIT licensed](./LICENSE).
