module.exports = {
  default: {
    require: [
      'support/**/*.js',
      'tests/steps/**/*.js'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ],
    paths: ['tests/features/**/*.feature'],
    publishQuiet: true,
    worldParameters: {},
    timeout: 30000
  }
};
