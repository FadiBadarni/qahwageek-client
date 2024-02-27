const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins(
    process.env.NODE_ENV === 'production' &&
      'babel-plugin-transform-remove-console'
  )
);
