require('dotenv').config({ path: `.env.${process.env.TEST_ENV || 'staging'}` });
const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const logger = require('./logger');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async openBrowser() {
    const browserType = process.env.BROWSER || 'chromium';
    logger.info(`Launching browser: ${browserType}`);

    const headless = process.env.HEADLESS !== 'false';
    const launchOptions = { headless };

    switch (browserType) {
      case 'firefox':
        this.browser = await firefox.launch(launchOptions);
        break;
      case 'webkit':
        this.browser = await webkit.launch(launchOptions);
        break;
      default:
        this.browser = await chromium.launch(launchOptions);
    }

    this.context = await this.browser.newContext({
      recordVideo: { dir: 'reports/videos' }
    });
    this.page = await this.context.newPage();
    logger.info('Browser launched and page created');
  }

  async closeBrowser() {
    if (this.page && !this.page.isClosed()) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
    logger.info('Browser closed');
  }
}

setWorldConstructor(CustomWorld);

module.exports = CustomWorld;
