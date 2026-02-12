const { Before, After } = require('@cucumber/cucumber');
const logger = require('./logger');

Before(async function () {
  await this.openBrowser();
  logger.info('Browser setup complete');
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    logger.error(`Scenario failed: ${scenario.pickle.name}`);
    try {
      const screenshot = await this.page.screenshot();
      this.attach(screenshot, 'image/png');
      logger.info('Screenshot captured for failed scenario');
    } catch (error) {
      logger.error(`Failed to capture screenshot: ${error.message}`);
    }
  }
  await this.closeBrowser();
  logger.info('Browser teardown complete');
});
