const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle      = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown   = page.locator('select.product_sort_container');
    this.cartBadge      = page.locator('.shopping_cart_badge');
    this.cartLink       = page.locator('.shopping_cart_link');
    this.burgerMenuBtn  = page.locator('#react-burger-menu-btn');
    this.logoutLink     = page.locator('#logout_sidebar_link');
  }

  async getItemCount() {
    return this.inventoryItems.count();
  }

  async getItemNames() {
    return this.inventoryItems.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices() {
    const texts = await this.inventoryItems.locator('.inventory_item_price').allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  async addToCartByIndex(index) {
    await this.inventoryItems.nth(index).locator('button').click();
  }

  async removeFromCartByIndex(index) {
    await this.inventoryItems.nth(index).locator('button').click();
  }

  async openProductByIndex(index) {
    await this.inventoryItems.nth(index).locator('.inventory_item_name').click();
  }

  async getFirstItemName() {
    return this.inventoryItems.first().locator('.inventory_item_name').textContent();
  }

  async getFirstItemPrice() {
    const text = await this.inventoryItems.first().locator('.inventory_item_price').textContent();
    return parseFloat(text.replace('$', ''));
  }

  async getCartBadgeCount() {
    if (await this.cartBadge.isVisible()) {
      return parseInt(await this.cartBadge.textContent());
    }
    return 0;
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.burgerMenuBtn.click();
    await this.waitForVisible(this.logoutLink);
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
