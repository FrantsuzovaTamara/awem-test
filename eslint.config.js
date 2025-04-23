import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import sortClassMembers from 'eslint-plugin-sort-class-members'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  sortClassMembers.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
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
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/ban-ts-comment': ['off'],
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
  },
)
