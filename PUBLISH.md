# Publish process

On `master`:

1. `git pull`
1. `yarn install`
1. `yarn build`
1. bump versions in `package.json` of all packages
1. bump `postcss-preset-infima` version in `core` package `devDependencies`
1. bump `infima` version in `postcss-preset-infima` package `peerDependencies`
1. `yarn install` (to update lock after versions bump)
1. `git commit -a -m "release: v0.2.0-alpha.xx"`
1. `git tag -a "v0.2.0-alpha.xx" -m "release: v0.2.0-alpha.xx"`
1. `yarn workspace infima publish`
1. `yarn workspace postcss-preset-infima publish`
1. `git push && git push --tags`
