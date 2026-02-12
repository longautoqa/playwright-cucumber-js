const logger = require('../../support/logger');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  /**
   * Actions
   */
  async navigate() {
    logger.info('Navigating to login page');
    await super.navigate();
    await this.waitForElement(this.usernameInput);
  }

  async enterUsername(username) {
    logger.info(`Entering username: ${username}`);
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    logger.info('Entering password');
    await this.fill(this.passwordInput, password);
  }

  async clickLogin() {
    logger.info('Clicking login button');
    await this.click(this.loginButton);
  }

  /**
   * Composite functions
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}

module.exports = LoginPage;
