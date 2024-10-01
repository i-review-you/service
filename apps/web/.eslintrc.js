const stylistic = require('@stylistic/eslint-plugin');
const customized = stylistic.configs.customize({
  // the following options are the default values
  indent: 2,
  quotes: 'single',
  semi: true,
  jsx: true,
  // ...
});

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  extends: 'next/core-web-vitals',
  plugins: ['@stylistic'],
  rules: {
    ...customized.rules,
  },
};
