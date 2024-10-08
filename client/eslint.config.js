import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist'],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        prettier: 'eslint-plugin-prettier',
        import: 'eslint-plugin-import',
    },
    rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'prettier/prettier': ['error'],
        'import/no-unresolved': 'error',
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
            },
        },
    },
});
