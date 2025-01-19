const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);
const {sourceExts, assetExts} = defaultConfig.resolver;

const transformer = {
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};
const sourceFileExits = [
  ...sourceExts,
  'cjs',
  'mjs',
  'ios.js',
  'ios.jsx',
  'android.js',
  'android.jsx',
  'svg',
];

const config = {
  transformer,
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: sourceFileExits,
  },
};

module.exports = mergeConfig(defaultConfig, config);
