const { test, expect }      = require('@playwright/test');
const { LoginPage }          = require('../pages/LoginPage');
const { InventoryPage }      = require('../pages/InventoryPage');
const { ProductDetailPage }  = require('../pages/ProductDetailPage');
const { users, sortOptions } = require('../utils/testData');

test.describe('Inventory', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC07 - Inventory page loads all 6 products', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await expect(inventory.pageTitle).toHaveText('Products');
    expect(await inventory.getItemCount()).toBe(6);
  });

  test('TC08 - Sort by Name A→Z lists products in ascending order', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy(sortOptions.nameAZ);
    const names = await inventory.getItemNames();
    expect(names).toEqual([...names].sort());
  });

  test('TC09 - Sort by Name Z→A lists products in descending order', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy(sortOptions.nameZA);
    const names = await inventory.getItemNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('TC10 - Sort by Price low→high lists products in ascending price order', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy(sortOptions.priceLowHigh);
    const prices = await inventory.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC11 - Sort by Price high→low lists products in descending price order', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy(sortOptions.priceHighLow);
    const prices = await inventory.getItemPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('TC12 - Product detail page shows correct name, price and description', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const detail    = new ProductDetailPage(page);

    const expectedName  = await inventory.getFirstItemName();
    const expectedPrice = await inventory.getFirstItemPrice();

    await inventory.openProductByIndex(0);

    await expect(page).toHaveURL(/inventory-item/);
    expect(await detail.getProductName()).toBe(expectedName);
    expect(await detail.getProductPrice()).toBe(expectedPrice);
    await expect(detail.productDesc).toBeVisible();
  });

});
