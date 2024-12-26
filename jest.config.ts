import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',

    clearMocks: true,

    transform: {
        '^.+\\.(t|j)s$': [
            'ts-jest',

            {
                tsconfig: './tsconfig.app.json',
                useESM: true,
            },
        ],
    },

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

    collectCoverageFrom: ['src/**/*.ts(x)?'],

    coverageDirectory: '<rootDir>/coverage',

    testEnvironment: 'jsdom',

    prettierPath: require.resolve('prettier-2'),

    roots: ['<rootDir>'],

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', 'jest-canvas-mock'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}

export default config
