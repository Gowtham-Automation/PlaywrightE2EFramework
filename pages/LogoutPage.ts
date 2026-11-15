import type { Locator, Page } from '@playwright/test';
import { HomePage } from './HomePage.js';

export class LogoutPage {
    private readonly page: Page;

    // Locators
    private readonly logoutHeading: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.logoutHeading = page.getByRole('heading', { name: 'Account Logout' });
        this.continueButton = page.getByRole('link', { name: 'Continue', exact: true });
    }

    /**
     * Checks whether the logout confirmation page is displayed.
     * @returns Promise<boolean> - true when the logout heading is visible
     */
    async isLogoutConfirmationVisible(): Promise<boolean> {
        return this.logoutHeading.isVisible();
    }

    /**
     * Continues to the store homepage after logout.
     * @returns Promise<HomePage> - Homepage object
     */
    async continueToStore(): Promise<HomePage> {
        await this.continueButton.click();
        return new HomePage(this.page);
    }

     /**
     * Clicks the Continue button after logout
     */
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

      /**
     * Checks if the Account Logout page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isLogoutPageExists(): Promise<boolean> {
        try {
            return await this.logoutHeading.isVisible();
        } catch (error) {
            console.log(`Error checking logout page: ${error}`);
            return false;
        }
 
    }
}
