module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: [
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort', 'import', 'unicorn', 'sonarjs'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 120,
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: {
            message: 'Avoid using the `Object` type. Did you mean `object`?',
          },
          Function: {
            message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
          },
          Boolean: {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
            fixWith: 'boolean',
          },
          Number: {
            message: 'Avoid using the `Number` type. Did you mean `number`?',
            fixWith: 'number',
          },
          Symbol: {
            message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
            fixWith: 'symbol',
          },
          String: {
            message: 'Avoid using the `String` type. Did you mean `string`?',
            fixWith: 'string',
          },
          '{}': {
            message: 'Use Record<K, V> instead',
            fixWith: 'Record<K, V>',
          },
          object: {
            message: 'Use Record<K, V> instead',
            fixWith: 'Record<K, V>',
          },
        },
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'rxjs/Rx',
            message: "Please import directly from 'rxjs' instead",
          },
        ],
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-duplicate-imports': ['error'],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
  },
};
