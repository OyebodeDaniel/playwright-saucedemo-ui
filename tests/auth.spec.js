const { test, expect } = require('@playwright/test');
const { LoginPage }     = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users }         = require('../utils/testData');

test.describe('Authentication', () => {

  test('TC01 - Valid login navigates to inventory page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC02 - Locked out user sees error message', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.lockedOut.username, users.lockedOut.password);
    expect(await login.isErrorVisible()).toBeTruthy();
    expect(await login.getErrorText()).toContain('Sorry, this user has been locked out');
  });

  test('TC03 - Invalid credentials show error message', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.invalid.username, users.invalid.password);
    expect(await login.isErrorVisible()).toBeTruthy();
    expect(await login.getErrorText()).toContain('Username and password do not match');
  });

  test('TC04 - Empty username shows required field error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('', users.standard.password);
    expect(await login.isErrorVisible()).toBeTruthy();
    expect(await login.getErrorText()).toContain('Username is required');
  });

  test('TC05 - Empty password shows required field error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.standard.username, '');
    expect(await login.isErrorVisible()).toBeTruthy();
    expect(await login.getErrorText()).toContain('Password is required');
  });

  test('TC06 - Logout redirects user back to login page', async ({ page }) => {
    const login     = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await inventory.logout();
    await expect(page).toHaveURL('/');
    await expect(login.loginButton).toBeVisible();
  });

});
