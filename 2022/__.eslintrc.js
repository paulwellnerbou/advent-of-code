module.exports = {
    env: {
        browser: false,
        es2021: true
    },
    extends: 'standard-with-typescript',
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
    },
    rules: {
        quotes: [2, 'double'],
        indent: ['error', 4],
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': 'off'
    }
}
