module.exports = {
  parser: 'babel-eslint',
  extends: ['yoctol-base'],
  env: {
    node: true,
    jest: true,
    jasmine: true,
  },
  plugins: ['@yoctol/kurator'],
  rules: {
    '@yoctol/kurator/no-undef-action': [
      'error',
      {
        actionMapJson: require('./src/kurator/kuratorActionMap.json'),
      },
    ],
  },
};
