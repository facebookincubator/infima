# Publish process

On `main` (or a feature branch):

1. `git pull`
1. `yarn install`
1. `yarn build`
1. bump versions in `package.json` of all packages
1. bump `postcss-preset-infima` version in `core` package `devDependencies`
1. bump `infima` version in `postcss-preset-infima` package `peerDependencies`

Run:

```bash
yarn install # Useful to update the lockfile

git commit -a -m "release: v0.2.0-alpha.xx"
git tag -a "v0.2.0-alpha.xx" -m "release: v0.2.0-alpha.xx"

yarn workspace infima publish
yarn workspace postcss-preset-infima publish
git push && git push --tags
```
