const { BasePage } = require('./BasePage');

class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName    = page.locator('.inventory_details_name');
    this.productPrice   = page.locator('.inventory_details_price');
    this.productDesc    = page.locator('.inventory_details_desc');
    this.addToCartBtn   = page.locator('[data-test^="add-to-cart"]');
    this.removeBtn      = page.locator('[data-test^="remove"]');
    this.backBtn        = page.locator('[data-test="back-to-products"]');
    this.cartBadge      = page.locator('.shopping_cart_badge');
  }

  async getProductName() {
    return this.productName.textContent();
  }

  async getProductPrice() {
    const text = await this.productPrice.textContent();
    return parseFloat(text.replace('$', ''));
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async goBack() {
    await this.backBtn.click();
  }
}

module.exports = { ProductDetailPage };
