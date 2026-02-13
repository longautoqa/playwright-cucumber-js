/** @typedef {import('playwright').Page} Page */

const logger = require('../../support/logger');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  /**
   * @param {Page} page
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

  /**
   * Gets all items currently in the cart.
   * @returns {Promise<Array<{quantity: string, name: string, description: string, price: string}>>} Array of cart item objects
   */
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

  /**
   * Verifies the quantity of the first cart item matches the expected value.
   * @param {number|string} expectedQty - The expected quantity
   * @returns {Promise<boolean>} True if the quantity matches, false otherwise
   * @throws {Error} If no items are in the cart
   */
  async verifyQuantity(expectedQty) {
    const items = await this.getItems();
    if (items.length === 0) {
      throw new Error('No items in cart');
    }
    const actualQty = items[0].quantity.trim();
    logger.info(`Expected quantity: ${expectedQty}, Actual: ${actualQty}`);
    return actualQty === String(expectedQty);
  }

  /**
   * Checks if the remove button is enabled.
   * @returns {Promise<boolean>} True if the remove button is enabled
   */
  async isRemoveButtonEnabled() {
    return await this.isElementEnabled(this.removeButton.first());
  }

  /**
   * Checks if the checkout button is enabled.
   * @returns {Promise<boolean>} True if the checkout button is enabled
   */
  async isCheckoutButtonEnabled() {
    return await this.isElementEnabled(this.checkoutButton);
  }

  /**
   * Checks if the continue shopping button is enabled.
   * @returns {Promise<boolean>} True if the continue shopping button is enabled
   */
  async isContinueShoppingButtonEnabled() {
    return await this.isElementEnabled(this.continueShoppingButton);
  }

  /**
   * Removes a cart item by its index.
   * @param {number} [index=0] - The index of the item to remove
   * @returns {Promise<void>}
   * @throws {Error} If no remove button exists at the given index
   */
  async removeItem(index = 0) {
    const count = await this.removeButton.count();
    if (count > index) {
      await this.click(this.removeButton.nth(index));
      logger.info(`Removed cart item at index ${index}`);
    } else {
      throw new Error(`No remove button at index ${index}`);
    }
  }

  /**
   * Gets the cart badge count, returning 0 if the badge is not visible.
   * @returns {Promise<number>} The number displayed on the cart badge
   */
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
