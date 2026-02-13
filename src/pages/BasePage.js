/** @typedef {import('playwright').Page} Page */
/** @typedef {import('playwright').Locator} Locator */

const logger = require('../../support/logger');

class BasePage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Helper methods
   */

  /**
   * Gets the current page URL.
   * @returns {Promise<string>} The current URL of the page
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Gets the text content of a locator.
   * @param {Locator} locator - The locator to get text from
   * @returns {Promise<string|null>} The text content of the element
   */
  async getText(locator) {
    return await locator.textContent();
  }

  /**
   * Gets the page title.
   * @returns {Promise<string>} The title of the page
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Common actions
   */

  /**
   * Navigates to the given URI appended to BASE_URL, or BASE_URL if no URI is provided.
   * @param {string} [uri] - The URI path to append to the base URL
   * @returns {Promise<void>}
   */
  async navigate(uri) {
    const url = uri ? `${process.env.BASE_URL}${uri}` : process.env.BASE_URL;
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url);
  }

  /**
   * Clicks on the given locator.
   * @param {Locator} locator - The locator to click
   * @returns {Promise<void>}
   */
  async click(locator) {
    await locator.click();
  }

  /**
   * Fills the given locator with text.
   * @param {Locator} locator - The locator to fill
   * @param {string} text - The text to fill into the element
   * @returns {Promise<void>}
   */
  async fill(locator, text) {
    await locator.fill(text);
  }

  /**
   * Waits for the given locator to appear in the DOM.
   * @param {Locator} locator - The locator to wait for
   * @param {number} [timeout=10000] - Maximum wait time in milliseconds
   * @returns {Promise<void>}
   */
  async waitForElement(locator, timeout = 10000) {
    await locator.waitFor({ timeout });
  }

  /**
   * Verifications
   */

  /**
   * Checks if an element is visible within the given timeout.
   * @param {Locator} locator - The locator to check visibility for
   * @param {number} [timeout=15000] - Maximum wait time in milliseconds
   * @returns {Promise<boolean>} True if the element is visible, false otherwise
   */
  async isElementVisible(locator, timeout = 15000) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch (error) {
      logger.info(`Element not visible: ${error.message}`);
      return false;
    }
  }

  /**
   * Checks if an element is enabled.
   * @param {Locator} locator - The locator to check
   * @returns {Promise<boolean>} True if the element is enabled, false otherwise
   */
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
