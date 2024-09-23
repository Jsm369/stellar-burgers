import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    api: '<rootDir>/src/utils/burger-api.ts',
    slices: '<rootDir>/src/services/slices/index.ts'
  }
};

export default config;
