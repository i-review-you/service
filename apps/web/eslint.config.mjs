import nextPlugin from '@next/eslint-plugin-next';
import common from '@i-review-you/config-eslint/common.mjs';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  ...common,
];
