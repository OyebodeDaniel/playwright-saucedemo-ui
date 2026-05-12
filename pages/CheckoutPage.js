const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    // Step 1 — shipping info
    this.firstNameInput  = page.locator('[data-test="firstName"]');
    this.lastNameInput   = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueBtn     = page.locator('[data-test="continue"]');
    this.cancelBtn       = page.locator('[data-test="cancel"]');
    this.errorMessage    = page.locator('[data-test="error"]');

    // Step 2 — order summary
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax      = page.locator('.summary_tax_label');
    this.summaryTotal    = page.locator('.summary_total_label');
    this.finishBtn       = page.locator('[data-test="finish"]');

    // Confirmation
    this.completeHeader  = page.locator('.complete-header');
    this.backHomeBtn     = page.locator('[data-test="back-to-products"]');
  }

  async fillShippingInfo(firstName, lastName, postalCode) {
    await this.waitForVisible(this.firstNameInput);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueBtn.click();
  }

  async finish() {
    await this.waitForVisible(this.finishBtn);
    await this.finishBtn.click();
  }

  async cancel() {
    await this.cancelBtn.click();
  }

  async isOrderComplete() {
    return this.completeHeader.isVisible();
  }

  async isErrorVisible() {
    return this.errorMessage.isVisible();
  }

  async getErrorText() {
    return this.errorMessage.textContent();
  }

  async getSubtotalValue() {
    const text = await this.summarySubtotal.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getTotalValue() {
    const text = await this.summaryTotal.textContent();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}

module.exports = { CheckoutPage };
