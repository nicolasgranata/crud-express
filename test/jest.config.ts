export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    coverageProvider: 'v8',
    globals: {
        'ts-jest': {
            isolatedModules: true
        }
    }
};
