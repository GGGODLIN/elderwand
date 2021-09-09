module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec).ts?(x)'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx', 'scss'],
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
        tsConfigFile: 'tsconfig.test.json',
    },
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules'],
};
