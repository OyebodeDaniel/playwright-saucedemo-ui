const { test, expect }  = require('@playwright/test');
const { LoginPage }      = require('../pages/LoginPage');
const { InventoryPage }  = require('../pages/InventoryPage');
const { CartPage }       = require('../pages/CartPage');
const { CheckoutPage }   = require('../pages/CheckoutPage');
const { users, checkout } = require('../utils/testData');

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    const login     = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await inventory.addToCartByIndex(0);
  });

  test('TC18 - Complete end-to-end purchase flow', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart      = new CartPage(page);
    const ch        = new CheckoutPage(page);

    await inventory.goToCart();
    await cart.proceedToCheckout();
    await ch.fillShippingInfo(checkout.valid.firstName, checkout.valid.lastName, checkout.valid.postalCode);
    await expect(page).toHaveURL(/checkout-step-two/);
    await ch.finish();

    await expect(page).toHaveURL(/checkout-complete/);
    expect(await ch.isOrderComplete()).toBeTruthy();
    await expect(ch.completeHeader).toHaveText('Thank you for your order!');
  });

  test('TC19 - Missing first name shows validation error', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart      = new CartPage(page);
    const ch        = new CheckoutPage(page);

    await inventory.goToCart();
    await cart.proceedToCheckout();
    await ch.fillShippingInfo('', checkout.valid.lastName, checkout.valid.postalCode);

    expect(await ch.isErrorVisible()).toBeTruthy();
    expect(await ch.getErrorText()).toContain('First Name is required');
  });

  test('TC20 - Missing last name shows validation error', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart      = new CartPage(page);
    const ch        = new CheckoutPage(page);

    await inventory.goToCart();
    await cart.proceedToCheckout();
    await ch.fillShippingInfo(checkout.valid.firstName, '', checkout.valid.postalCode);

    expect(await ch.isErrorVisible()).toBeTruthy();
    expect(await ch.getErrorText()).toContain('Last Name is required');
  });

  test('TC21 - Missing postal code shows validation error', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart      = new CartPage(page);
    const ch        = new CheckoutPage(page);

    await inventory.goToCart();
    await cart.proceedToCheckout();
    await ch.fillShippingInfo(checkout.valid.firstName, checkout.valid.lastName, '');

    expect(await ch.isErrorVisible()).toBeTruthy();
    expect(await ch.getErrorText()).toContain('Postal Code is required');
  });

  test('TC22 - Cancelling checkout step 1 returns to cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart      = new CartPage(page);
    const ch        = new CheckoutPage(page);

    await inventory.goToCart();
    await cart.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
    await ch.cancel();

    await expect(page).toHaveURL(/cart/);
  });

  test('TC23 - Order summary subtotal matches item prices in cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart      = new CartPage(page);
    const ch        = new CheckoutPage(page);

    const expectedPrice = await inventory.getFirstItemPrice();

    await inventory.goToCart();
    await cart.proceedToCheckout();
    await ch.fillShippingInfo(checkout.valid.firstName, checkout.valid.lastName, checkout.valid.postalCode);
    await expect(page).toHaveURL(/checkout-step-two/);

    const subtotal = await ch.getSubtotalValue();
    expect(subtotal).toBe(expectedPrice);
  });

});
