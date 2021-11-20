module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  transform: {
    '^.*/.*\.tsx?': 'esbuild-runner/jest'
  }
};