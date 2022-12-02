module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    'no-non-null-assertion': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off'
  }
}