import dotenv from 'dotenv';
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { AccountPage } from '../pages/AccountPage.js';
import { LogoutPage } from '../pages/LogoutPage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { SuccessPage } from '../pages/SuccessPage.js';
import { AdminLoginPage } from '../pages/AdminLoginPage.js';
import { AdminCustomersPage } from '../pages/AdminCustomersPage.js';
import { AdminCustomerEditPage } from '../pages/AdminCustomerEditPage.js';

dotenv.config();

const APP_URL = process.env.WEB_APP_URL;

type PageFixtures = {
    homePage: HomePage;
    registerPage: RegisterPage;
    loginPage: LoginPage;
    accountPage: AccountPage;
    logoutPage: LogoutPage;
    searchResultsPage: SearchResultsPage;
    productPage: ProductPage;
    cartPage: CartPage;
    successPage: SuccessPage;
    adminLoginPage: AdminLoginPage;
    adminCustomersPage: AdminCustomersPage;
    adminCustomerEditPage: AdminCustomerEditPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        if (!APP_URL) {
            throw new Error('WEB_APP_URL must be configured in the environment.');
        }
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
    logoutPage: async ({ page }, use) => {
        await use(new LogoutPage(page));
    },
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    successPage: async ({ page }, use) => {
        await use(new SuccessPage(page));
    },
    adminLoginPage: async ({ page }, use) => {
        await use(new AdminLoginPage(page));
    },
     adminCustomersPage: async ({ page }, use) => {
        await use(new AdminCustomersPage(page));
    },
     adminCustomerEditPage: async ({ page }, use) => {
        await use(new AdminCustomerEditPage(page));
    },
});

export { expect } from '@playwright/test';
