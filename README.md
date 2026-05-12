# Playwright UI Automation — SauceDemo (Swag Labs)

![Playwright Tests](https://github.com/danieloyebode/playwright-automationexercise-ui/actions/workflows/playwright.yml/badge.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

End-to-end UI automation test suite for [SauceDemo](https://www.saucedemo.com) built with **Playwright** and **JavaScript**, following the **Page Object Model (POM)** design pattern.

> Built by **Daniel Oyebode** — Senior QA Automation Engineer | ISTQB Certified | Fintech Specialist

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation framework |
| JavaScript (Node.js) | Test language |
| Page Object Model | Design pattern for maintainability |
| Allure | Test reporting |
| GitHub Actions | CI/CD pipeline |

---

## Project Structure

```
playwright-automationexercise-ui/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline
├── pages/
│   ├── BasePage.js                 # Shared page utilities
│   ├── LoginPage.js                # Login form interactions
│   ├── InventoryPage.js            # Product listing, sorting, cart badge
│   ├── ProductDetailPage.js        # Individual product detail
│   ├── CartPage.js                 # Cart review and navigation
│   └── CheckoutPage.js             # Shipping info, order summary, confirmation
├── tests/
│   ├── auth.spec.js                # TC01–TC06: Login, logout, error states
│   ├── inventory.spec.js           # TC07–TC12: Products, sorting, detail page
│   ├── cart.spec.js                # TC13–TC17: Add, remove, badge, navigation
│   └── checkout.spec.js            # TC18–TC23: Full flow, validation, summary
├── utils/
│   └── testData.js                 # Centralised users, checkout data, sort options
├── playwright.config.js
└── package.json
```

---

## Test Coverage

| Spec File | Test Cases | Description |
|---|---|---|
| `auth.spec.js` | TC01–TC06 | Valid login, locked out user, invalid creds, empty fields, logout |
| `inventory.spec.js` | TC07–TC12 | Page load, 4 sort modes, product detail verification |
| `cart.spec.js` | TC13–TC17 | Add single/multiple items, remove from inventory, remove from cart, continue shopping |
| `checkout.spec.js` | TC18–TC23 | End-to-end purchase, 3 field validations, cancel step 1, order summary total |

**Total: 23 automated test cases** across 4 test modules — run on **Chromium** and **Firefox** (46 runs per CI cycle).

---

## Test Users

SauceDemo provides built-in test accounts, all using the same password: `secret_sauce`

| Username | Behaviour |
|---|---|
| `standard_user` | Normal user — all tests pass |
| `locked_out_user` | Cannot log in — shows error |
| `problem_user` | UI quirks — images broken |
| `performance_glitch_user` | Slow responses |
| `invalid_user` | Does not exist — login fails |

---

## Getting Started

### Prerequisites
- Node.js v20+
- npm

### Install

```bash
git clone https://github.com/danieloyebode/playwright-automationexercise-ui.git
cd playwright-automationexercise-ui
npm install
npx playwright install --with-deps
```

### Run all tests

```bash
npm test
```

### Run headed (visible browser)

```bash
npm run test:headed
```

### Run a specific spec

```bash
npx playwright test tests/auth.spec.js
npx playwright test tests/inventory.spec.js
npx playwright test tests/cart.spec.js
npx playwright test tests/checkout.spec.js
```

### Run a single test by title

```bash
npx playwright test -g "TC18"
```

### View HTML report

```bash
npm run test:report
```

### Generate & open Allure report

```bash
npm run allure:generate
npm run allure:open
```

---

## CI/CD

Tests run automatically on:
- Every **push** to `main` or `develop`
- Every **pull request** to `main`
- **Daily at 6:00 AM UTC** (scheduled regression)

Artifacts (HTML report, Allure results, failure screenshots/videos) are uploaded on every run and retained for 14 days.

---

## Design Decisions

**Page Object Model** — Every page has its own class. Tests never contain selectors directly — they call page methods. Selectors live in one place and are easy to update.

**`beforeEach` for shared setup** — Login is handled in `beforeEach` within each describe block, keeping individual tests focused on the behaviour under test rather than setup boilerplate.

**Self-validating sort assertions** — Sort tests retrieve the list after sorting and compare it to a programmatically sorted copy of itself. This avoids hardcoding product names while still catching any ordering regression.

**Screenshot + video on failure** — Playwright captures screenshots and video only on failed tests, keeping CI artifacts lean while giving full diagnostic context when things go wrong.

---

## Author

**Daniel Oyebode**
Senior QA Automation Engineer | ISTQB Certified Tester (No. 00542143)
[LinkedIn](https://www.linkedin.com/in/daniel-inioluwa-oyebode-ambcs-736b9115a/) · [GitHub](https://github.com/OyebodeDaniel)
