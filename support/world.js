require('dotenv').config({ path: `.env.${process.env.TEST_ENV || 'staging'}` });
const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const logger = require('./logger');

class CustomWorld {
  constructor({ parameters }) {
    this.parameters = parameters;
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async openBrowser() {
    const browserType = process.env.BROWSER || 'chromium';
    logger.info(`Launching browser: ${browserType}`);

    const launchOptions = { headless: true };

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

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    logger.info('Browser launched and page created');
  }

  async closeBrowser() {
    if (this.page) {
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
