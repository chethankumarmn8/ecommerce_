module.exports = function override(config, env) {
  // Ignore source map warnings from 3rd party libs
  config.ignoreWarnings = [
    {
      module: /node_modules/,
      message: /source map/,
    },
  ];
  return config;
};
