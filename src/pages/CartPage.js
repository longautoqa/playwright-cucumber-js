const logger = require('../../support/logger');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.itemQuantity = page.locator('.cart_quantity');
    this.itemName = page.locator('.inventory_item_name');
    this.itemDesc = page.locator('.inventory_item_desc');
    this.itemPrice = page.locator('.inventory_item_price');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async getItems() {
    const count = await this.cartItems.count();
    const cartItems = [];

    for (let i = 0; i < count; i++) {
      const quantity = await this.itemQuantity.nth(i).textContent();
      const name = await this.itemName.nth(i).textContent();
      const description = await this.itemDesc.nth(i).textContent();
      const price = await this.itemPrice.nth(i).textContent();
      cartItems.push({ quantity, name, description, price });
      logger.info(`Cart item: ${name}, Qty: ${quantity}, Price: ${price}`);
    }

    return cartItems;
  }

  async verifyQuantity(expectedQty) {
    const items = await this.getItems();
    if (items.length === 0) {
      throw new Error('No items in cart');
    }
    const actualQty = items[0].quantity.trim();
    logger.info(`Expected quantity: ${expectedQty}, Actual: ${actualQty}`);
    return actualQty === String(expectedQty);
  }

  async isRemoveButtonEnabled() {
    return await this.isElementEnabled(this.removeButton.first());
  }

  async isCheckoutButtonEnabled() {
    return await this.isElementEnabled(this.checkoutButton);
  }

  async isContinueShoppingButtonEnabled() {
    return await this.isElementEnabled(this.continueShoppingButton);
  }

  async removeItem(index = 0) {
    const count = await this.removeButton.count();
    if (count > index) {
      await this.click(this.removeButton.nth(index));
      logger.info(`Removed cart item at index ${index}`);
    } else {
      throw new Error(`No remove button at index ${index}`);
    }
  }

  async getCartBadgeCount() {
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
}

module.exports = CartPage;
