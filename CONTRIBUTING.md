# Contributing to Infima

We want to make contributing to this project as easy and transparent as possible.

## Pull Requests

We actively welcome your pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. If you haven't already, complete the Contributor License Agreement ("CLA").

## Contributor License Agreement ("CLA")

In order to accept your pull request, we need you to submit a CLA. You only need to do this once to work on any of Facebook's open source projects.

Complete your CLA here: <https://code.facebook.com/cla>

## Issues

We use GitHub issues to track public bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

Facebook has a [bounty program](https://www.facebook.com/whitehat/) for the safe disclosure of security bugs. In those cases, please go through the process outlined on that page and do not file a public issue.

## Working on Infima Code

```sh
infima
├── packages
│   ├── core
│   │   ├── demo
│   │   │   ├── css
│   │   │   │   ├── default
│   │   │   │   └── default-dark
│   │   │   ├── img
│   │   │   └── js
│   │   ├── js
│   │   └── styles
│   │       ├── common
│   │       ├── components
│   │       ├── content
│   │       ├── layout
│   │       ├── themes
│   │       │   ├── default
│   │       │   └── default-dark
│   │       └── utilities
│   └── postcss-preset-infima
└── website
```

### Project structure rundown

At a high level, there a few key parts to Infima:

- `/core` Contains the source code of the project
- `/core/js` Contains the `javascript` implementation which define additional behaviors to some components
- `/core/styles` Contains the `css` files which define the components' stylization
- `/core/demo` Contains the `HTML` of a `infima` playground including all components and their possible customizations
- `/website` Contains the documentation website which is live on https://infima.dev/

## License

By contributing to Infima, you agree that your contributions will be licensed under the LICENSE file in the root directory of this source tree.
