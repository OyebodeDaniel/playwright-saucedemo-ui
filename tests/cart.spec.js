const { test, expect } = require('@playwright/test');
const { LoginPage }     = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage }      = require('../pages/CartPage');
const { users }         = require('../utils/testData');

test.describe('Cart', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC13 - Adding one product updates cart badge to 1', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addToCartByIndex(0);
    expect(await inventory.getCartBadgeCount()).toBe(1);
  });

  test('TC14 - Adding two products updates cart badge to 2', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addToCartByIndex(0);
    await inventory.addToCartByIndex(1);
    expect(await inventory.getCartBadgeCount()).toBe(2);
  });

  test('TC15 - Removing a product from inventory clears the cart badge', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addToCartByIndex(0);
    expect(await inventory.getCartBadgeCount()).toBe(1);
    await inventory.removeFromCartByIndex(0);
    expect(await inventory.getCartBadgeCount()).toBe(0);
    await expect(inventory.cartBadge).not.toBeVisible();
  });

  test('TC16 - Removing a product from the cart page empties the cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart      = new CartPage(page);

    await inventory.addToCartByIndex(0);
    await inventory.goToCart();

    expect(await cart.getItemCount()).toBe(1);
    await cart.removeItemByIndex(0);
    expect(await cart.getItemCount()).toBe(0);
  });

  test('TC17 - Continue Shopping from cart returns to inventory', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart      = new CartPage(page);

    await inventory.addToCartByIndex(0);
    await inventory.goToCart();
    await cart.continueShopping();

    await expect(page).toHaveURL(/inventory/);
    await expect(inventory.pageTitle).toHaveText('Products');
  });

});
