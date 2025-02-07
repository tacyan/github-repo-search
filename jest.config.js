const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lucide-react/dist|@radix-ui/react-.*)/)'
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  }
}

module.exports = createJestConfig(customJestConfig)

