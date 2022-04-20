module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy'
  },
  testEnvironment: 'jsdom',
  setupFiles: [
    './config/jest.setup.js',
    './config/jest.redux.setup.js'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/App.tsx',
    '!**/node_modules/**'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*))'
  ]
}
