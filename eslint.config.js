// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            tseslint.configs.stylistic,
            angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            // Angular-специфичные правила
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],

            // Правила типов TypeScript
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-explicit-any': ['error', { 'fixToUnknown': true }],
            '@typescript-eslint/consistent-type-imports': 'error',
            /* '@typescript-eslint/no-unsafe-assignment': 'error', */
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/restrict-template-expressions': 'error',
            /*'@typescript-eslint/no-floating-promises': 'error',*/
            '@typescript-eslint/require-await': 'error',

            // Стилистические правила
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'allow',
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
            ],

            // Правила импорта/экспорта
            'no-duplicate-imports': ['error', { includeExports: true }],
            'sort-imports': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',

            // Дополнительные правила безопасности
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/prefer-readonly': 'error',

            // Общие правила ESLint
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',

            // Пробелы в объектах — всегда
            'object-curly-spacing': ['error', 'always'],

            // Пробелы в массивах — всегда
            'array-bracket-spacing': ['error', 'always'],

            // Без пробелов в вычисляемых свойствах
            'computed-property-spacing': ['error', 'never'],

            // Пробел перед блоками — всегда
            'space-before-blocks': ['error', 'always'],

            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'return'
                }
            ]
        },
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
                ecmaVersion: 'latest',
            },
        },
    },
    {
        files: ['**/*.html'],
        extends: [
            angular.configs.templateRecommended,
            angular.configs.templateAccessibility,
        ],
        rules: {
            '@angular-eslint/template/interactive-supports-focus': "off",
            '@angular-eslint/template/click-events-have-key-events': "off",
        },
    },
]);
