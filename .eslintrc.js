module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true,
  },
  ignorePatterns: ['**/*.js'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
  },
  plugins: ['@typescript-eslint', 'prettier', 'sort-class-members'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'off',
          parameterProperties: 'explicit',
        },
      },
    ],
    '@typescript-eslint/prefer-readonly': ['error', {onlyInlineLambdas: false}],
    'no-extra-semi': 'off',
    'prettier/prettier': [
      'error',
      {
        'no-extra-semi': 'error',
      },
    ],
    'sort-class-members/sort-class-members': [
      2,
      {
        order: [
          '[static-properties]',
          '[static-methods]',
          '[properties]',
          'constructor',
          {
            type: 'property',
            propertyType: 'ArrowFunctionExpression',
            accessibility: 'public',
          },
          {
            type: 'method',
            accessibility: 'public',
          },
          {
            type: 'property',
            propertyType: 'ArrowFunctionExpression',
            accessibility: 'private',
          },
          {
            type: 'method',
            accessibility: 'private',
          },
        ],
        accessorPairPositioning: 'getThenSet',
      },
    ],
  },
}
