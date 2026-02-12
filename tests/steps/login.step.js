const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

const logger = require('../../support/logger');
const LoginPage = require('../../src/pages/LoginPage');
const ProductsPage = require('../../src/pages/ProductsPage');
const CartPage = require('../../src/pages/CartPage');

const credentials = require('../../test-data/credentials.json');

Given('I open the Sauce Demo website', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  logger.info('Sauce Demo website opened');
});

When('I enter the username and password', async function () {
  const { username, password } = credentials.validUser;
  
  await this.loginPage.enterUsername(username);
  await this.loginPage.enterPassword(password);
  logger.info('Username and password entered');
});

When('I click the Login button', async function () {
  await this.loginPage.clickLogin();
  logger.info('Login button clicked');
});

Then('I should see the products page', async function () {
  this.productsPage = new ProductsPage(this.page);
  const isVisible = await this.productsPage.isDisplayed();
  assert.strictEqual(isVisible, true, 'Products page should be visible after login');
  logger.info('Products page verified as visible');
});

When('I get all products with their name and price', async function () {
  this.products = await this.productsPage.getAllProducts();
  logger.info(`Retrieved ${this.products.length} products`);
});

Then('all products should be displayed with name and price', async function () {
  assert.ok(this.products.length > 0, 'At least one product should be displayed');
  for (const product of this.products) {
    assert.ok(product.name, 'Product name should not be empty');
    assert.ok(product.price, 'Product price should not be empty');
    logger.info(`Verified product: ${product.name} - ${product.price}`);
  }
});

When('I add a product to the cart', async function () {
  await this.productsPage.addProductToCart(0);
  logger.info('Product added to cart');
});

Then('the cart quantity should be {string}', async function (expectedQty) {
  const actualQty = await this.productsPage.getCartCount();
  assert.strictEqual(actualQty, parseInt(expectedQty, 10), `Cart quantity should be ${expectedQty}`);
  logger.info(`Cart quantity verified: ${actualQty}`);
});

When('I go to the cart page', async function () {
  await this.productsPage.goToCart();
  this.cartPage = new CartPage(this.page);
  logger.info('Navigated to cart page');
});

Then('the cart should show the correct quantity and description', async function () {
  const items = await this.cartPage.getItems();
  assert.ok(items.length > 0, 'Cart should have at least one item');
  assert.strictEqual(items[0].quantity.trim(), '1', 'Item quantity should be 1');
  assert.ok(items[0].name, 'Item should have a name/description');
  logger.info(`Cart item verified: ${items[0].name}, Qty: ${items[0].quantity}`);
});

Then('the Remove, Checkout, and Continue Shopping buttons should be enabled', async function () {
  const removeEnabled = await this.cartPage.isRemoveButtonEnabled();
  const checkoutEnabled = await this.cartPage.isCheckoutButtonEnabled();
  const continueEnabled = await this.cartPage.isContinueShoppingButtonEnabled();

  assert.strictEqual(removeEnabled, true, 'Remove button should be enabled');
  assert.strictEqual(checkoutEnabled, true, 'Checkout button should be enabled');
  assert.strictEqual(continueEnabled, true, 'Continue Shopping button should be enabled');
  logger.info('All cart buttons verified as enabled');
});

When('I remove the product from the cart', async function () {
  await this.cartPage.removeItem(0);
  logger.info('Product removed from cart');
});

Then('the cart quantity should be updated to {string}', async function (expectedQty) {
  const actualQty = await this.cartPage.getCartBadgeCount();
  assert.strictEqual(actualQty, parseInt(expectedQty, 10), `Cart quantity should be ${expectedQty}`);
  logger.info(`Cart quantity after removal verified: ${actualQty}`);
});
