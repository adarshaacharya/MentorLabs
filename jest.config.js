module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'server', // all files are inside serber fp;der
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest', // tells jest tp use ts-jest for ts/js files
  },
  testEnvironment: 'node',
};
