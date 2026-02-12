const logger = require('../../support/logger');
const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.itemName = page.locator('.inventory_item_name');
    this.itemPrice = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async isDisplayed() {
    try {
      await this.waitForElement(this.pageTitle);
      const title = await this.getText(this.pageTitle);
      const visible = title === 'Products';
      logger.info(`Products page displayed: ${visible}`);
      return visible;
    } catch (error) {
      logger.error(`Products page not displayed: ${error.message}`);
      return false;
    }
  }

  async getAllProducts() {
    const count = await this.inventoryItems.count();
    const products = [];

    for (let i = 0; i < count; i++) {
      const name = await this.itemName.nth(i).textContent();
      const price = await this.itemPrice.nth(i).textContent();
      products.push({ name, price });
      logger.info(`Product: ${name} - ${price}`);
    }

    logger.info(`Total products found: ${products.length}`);
    return products;
  }

  async addProductToCart(index = 0) {
    await this.click(this.addToCartButtons.nth(index));
    logger.info(`Added product at index ${index} to cart`);
  }

  async getCartCount() {
    try {
      const badge = await this.cartBadge.textContent({ timeout: 3000 });
      const count = parseInt(badge, 10);
      logger.info(`Cart badge count: ${count}`);
      return count;
    } catch (error) {
      logger.info('Cart badge not visible, cart is empty');
      return 0;
    }
  }

  async goToCart() {
    logger.info('Navigating to cart');
    await this.click(this.cartLink);
  }
}

module.exports = ProductsPage;
