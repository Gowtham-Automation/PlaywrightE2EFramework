import type { Locator, Page } from '@playwright/test';
import { LoginPage } from './LoginPage.js';
import { RegisterPage } from './RegisterPage.js';
import { SearchResultsPage } from './SearchResultsPage.js';
import { CartPage } from './CartPage.js';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly myAccountLink: Locator;
    private readonly registerLink: Locator;
    private readonly loginLink: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.myAccountLink = page.locator('a[title="My Account"]');
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.loginLink = page.getByRole('link', { name: 'Login', exact: true });
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.locator('#search button');
        this.shoppingCartLink = page.getByRole('link', { name: /Shopping Cart/ });
    }

    /**
     * Navigates to the application URL
     * @param url - The application URL
     */
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Opens the My Account navigation menu.
     */
    async clickMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    /**
     * Opens the customer registration page.
     * @returns Promise<RegisterPage> - Registration page object
     */
    async clickRegister(): Promise<RegisterPage> {
        await this.registerLink.click();
        return new RegisterPage(this.page);
    }

    /**
     * Opens the customer login page from the My Account menu.
     * @returns Promise<LoginPage> - Login page object
     */
    async clickLogin(): Promise<LoginPage> {
        await this.myAccountLink.click();
        await this.loginLink.click();
        return new LoginPage(this.page);
    }

    /**
     * Searches the store for a product.
     * @param productName - Product name to search for
     * @returns Promise<SearchResultsPage> - Search results page object
     */
    async searchProduct(productName: string): Promise<SearchResultsPage> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
        return new SearchResultsPage(this.page);
    }

    /**
     * Opens the shopping cart.
     * @returns Promise<CartPage> - Shopping cart page object
     */
    async openShoppingCart(): Promise<CartPage> {
        await this.shoppingCartLink.click();
        return new CartPage(this.page);
    }

    /**
     * Checks if the My Account link is visible
     * @returns Promise<boolean> - true if visible
    */
    async isMyAccountLinkVisible(): Promise<boolean> {
        try {
            return await this.myAccountLink.isVisible();
        } catch (error) {
            console.log(`Error checking My Account link: ${error}`);
            return false;
        }
    }
}
