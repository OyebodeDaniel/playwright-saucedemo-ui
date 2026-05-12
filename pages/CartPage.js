const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems             = page.locator('.cart_item');
    this.continueShoppingBtn   = page.locator('[data-test="continue-shopping"]');
    this.checkoutBtn           = page.locator('[data-test="checkout"]');
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async getItemNames() {
    return this.cartItems.locator('.inventory_item_name').allTextContents();
  }

  async removeItemByIndex(index) {
    await this.cartItems.nth(index).locator('[data-test^="remove"]').click();
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}

module.exports = { CartPage };
