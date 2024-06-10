import prettier from 'eslint-plugin-prettier';

export default [
  {
    plugins: { prettier },
    rules: {
      'prettier/prettier': ['error'],
      camelcase: 'off',
      'no-param-reassign': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'import/no-named-as-default': 'off',
      'import/no-unresolved': 'off',
      'no-console': 'error',
      'no-tabs': 'off',
    },
  },
  {
    files: ['resources/js/**/*.jsx", "resources/js/**/*.js'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
