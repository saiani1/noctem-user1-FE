module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ], // should add ".ts" if typescript project
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        mjs: 'never',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    'arrow-body-style': ['error', 'always'],
    'import/prefer-default-export': 'off',
    'no-param-reassign': [2, { props: false }],
    'no-underscore-dangle': 'off',
    'prefer-regex-literals': 'off',
    'no-use-before-define': 'off',
    'no-useless-concat': 'off',
    'react/jsx-props-no-spreading': 'off', // 뭔지 찾아볼거
    '@typescript-eslint/no-var-requires': 0, // 뭔지 찾아볼거
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
