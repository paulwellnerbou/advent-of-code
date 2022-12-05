module.exports = {
    env: {
        browser: false,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    overrides: [{
        'files': ['common/**.ts', 'day*/**/.ts'],
    }],
    rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        quotes: [2, 'double'],
        indent: ['error', 4],
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': 'off'
    }
}
