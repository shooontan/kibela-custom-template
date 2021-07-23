import manifest from '../manifest.json';

if (manifest.version === process.env.npm_package_version) {
  // eslint-disable-next-line no-console
  console.log(manifest.version);
} else {
  throw new Error(`conflict version.`);
}
