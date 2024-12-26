import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind'
import tailwind from 'eslint-plugin-tailwindcss'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist'] },

    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,

            ...tailwind.configs['flat/recommended'],

            reactPlugin.configs.flat.recommended,
            reactPlugin.configs.flat['jsx-runtime'],
        ],

        files: ['**/*.{ts,tsx}'],

        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },

        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'react-compiler': reactCompiler,
            'readable-tailwind': eslintPluginReadableTailwind,
        },

        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],

            'react-compiler/react-compiler': 'error',

            ...eslintPluginReadableTailwind.configs.error.rules,

            'react/jsx-filename-extension': [
                'warn',
                {
                    extensions: ['.tsx'],
                },
            ],

            'react/jsx-sort-props': [
                'warn',
                {
                    multiline: 'last',
                    shorthandFirst: true,
                    noSortAlphabetically: true,
                    callbacksLast: true,
                },
            ],

            'react/function-component-definition': [
                'warn',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],

            'react/prop-types': 'off',

            'require-await': 'warn',
        },
    },
)
