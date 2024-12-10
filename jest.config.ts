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

    collectCoverageFrom: ['src/**/*.(t|j)s'],

    coverageDirectory: '<rootDir>/coverage',

    testEnvironment: 'jsdom',

    prettierPath: require.resolve('prettier-2'),

    roots: ['<rootDir>'],

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}

export default config
