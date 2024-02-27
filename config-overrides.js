const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  ...(process.env.NODE_ENV === 'production'
    ? [addBabelPlugin('babel-plugin-transform-remove-console')]
    : [])
);
