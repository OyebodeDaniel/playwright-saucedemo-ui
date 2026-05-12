class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path);
  }

  async waitForVisible(locator, timeout = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
  }
}

module.exports = { BasePage };
