# Publish process

On master:

- git pull
- yarn install
- yarn build
- Bump versions in `package.json` of all packages
- git commit -a -m "release: v0.2.0-alpha.xx"
- git tag -a "v0.2.0-alpha.xx" -m "release: v0.2.0-alpha.xx"
- yarn workspace infima publish
- yarn workspace postcss-preset-infima publish
- git push && git push --tags
