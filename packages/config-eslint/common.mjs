import js from '@eslint/js';
import json from '@eslint/json';
import tsLint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default [
  js.configs.recommended,
  ...tsLint.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: false,
  }),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,jsx}'],
    rules: {
      // '@stylistic/ts/indent': ['error', 2],
    },
  },
  json.configs.recommended,
];
