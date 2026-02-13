/** @typedef {import('playwright').Page} Page */

const logger = require('../../support/logger');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Actions
   */

  /**
   * Navigates to the login page and waits for the username input to appear.
   * @returns {Promise<void>}
   */
  async navigate() {
    logger.info('Navigating to login page');
    await super.navigate();
    await this.waitForElement(this.usernameInput);
  }

  /**
   * Enters a username into the username input field.
   * @param {string} username - The username to enter
   * @returns {Promise<void>}
   */
  async enterUsername(username) {
    logger.info(`Entering username: ${username}`);
    await this.fill(this.usernameInput, username);
  }

  /**
   * Enters a password into the password input field.
   * @param {string} password - The password to enter
   * @returns {Promise<void>}
   */
  async enterPassword(password) {
    logger.info('Entering password');
    await this.fill(this.passwordInput, password);
  }

  /**
   * Clicks the login button.
   * @returns {Promise<void>}
   */
  async clickLogin() {
    logger.info('Clicking login button');
    await this.click(this.loginButton);
  }

  /**
   * Gets the error message text displayed on the login page.
   * @returns {Promise<string>} The error message text
   */
  async getErrorMessage() {
    await this.waitForElement(this.errorMessage);
    const message = await this.getText(this.errorMessage);
    logger.info(`Error message: ${message}`);
    return message;
  }

  /**
   * Composite functions
   */

  /**
   * Performs a complete login by entering username, password, and clicking login.
   * @param {string} username - The username to log in with
   * @param {string} password - The password to log in with
   * @returns {Promise<void>}
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}

module.exports = LoginPage;
