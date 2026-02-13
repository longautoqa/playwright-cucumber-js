const fs = require('fs');
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

    try {
      const video = this.page.video();
      if (video) {
        const savePath = `reports/videos/${scenario.pickle.name.replace(/\s+/g, '_')}_${Date.now()}.webm`;
        await this.page.close();
        await video.saveAs(savePath);
        const videoBuffer = fs.readFileSync(savePath);
        this.attach(videoBuffer, 'video/webm');
        logger.info('Video captued for failed scenario');
      }
    } catch (error) {
      logger.error(`Failed to capure video: ${error.message}`);
    }
  }
  await this.closeBrowser();
  logger.info('Browser teardown complete');
});
