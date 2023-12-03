module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'], // only run .test.ts files
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
