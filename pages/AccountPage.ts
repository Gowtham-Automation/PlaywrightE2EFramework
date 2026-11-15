import type { Locator, Page } from '@playwright/test';
import { LogoutPage } from './LogoutPage.js';

export class AccountPage {
    private readonly page: Page;

    // Locators
    private readonly accountHeading: Locator;
    private readonly myAccountMenu: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.accountHeading = page.locator('#content').getByRole('heading', { name: 'My Account', exact: true });
        this.myAccountMenu = page.locator('a[title="My Account"]');
        this.logoutLink = page.getByRole('link', { name: 'Logout', exact: true });
    }

    /**
     * Checks whether the authenticated customer account page is displayed.
     * @returns Promise<boolean> - true when the account heading is visible
     */
    async isAccountDashboardVisible(): Promise<boolean> {
        return this.accountHeading.isVisible();
    }

    /**
     * Logs out the current customer.
     * @returns Promise<LogoutPage> - Logout confirmation page object
     */
    async logout(): Promise<LogoutPage> {
        await this.myAccountMenu.click();
        await this.logoutLink.first().click();
        return new LogoutPage(this.page);
    }

     /**
     * Checks if the My Account page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            return await this.accountHeading.isVisible();
        } catch (error) {
            console.log(`Error checking My Account page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the Logout link
     */
    async clickLogout(): Promise<void> {
        await this.logoutLink.click();
    }

     /**
     * Checks if authenticated account options are visible
     * @returns Promise<boolean> - true if the Logout link is visible
     */
    async isAuthenticated(): Promise<boolean> {
        try {
            return await this.logoutLink.isVisible();
        } catch (error) {
            console.log(`Error checking authentication: ${error}`);
            return false;
        }
    }
}
