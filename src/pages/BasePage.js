const logger = require('../../support/logger');

class BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Helper methods
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  async getText(locator) {
    return await locator.textContent();
  }

  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Common actions
   */
  async navigate(uri) {
    const url = uri ? `${process.env.BASE_URL}${uri}` : process.env.BASE_URL;
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url);
  }

  async click(locator) {
    await locator.click();
  }

  async fill(locator, text) {
    await locator.fill(text);
  }

  async waitForElement(locator, timeout = 10000) {
    await locator.waitFor({ timeout });
  }

  /**
   * Verifications
   */
  async isElementVisible(locator, timeout = 5000) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch (error) {
      logger.info(`Element not visible: ${error.message}`);
      return false;
    }
  }

  async isElementEnabled(locator) {
    try {
      return await locator.isEnabled();
    } catch (error) {
      logger.info(`Element not found or not enabled: ${error.message}`);
      return false;
    }
  }
}

module.exports = BasePage;
