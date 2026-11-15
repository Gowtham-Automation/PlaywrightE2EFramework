import type { Locator, Page } from '@playwright/test';
import { AccountPage } from './AccountPage.js';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly warningMessage: Locator;
    private readonly loginHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.emailInput = page.getByPlaceholder('E-Mail Address');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
        this.warningMessage = page.locator('.alert-danger');
        this.loginHeading = page.getByRole('heading', { name: 'Returning Customer' });
    }

    /**
     * Logs in with the supplied customer credentials.
     * @param email - Customer email address
     * @param password - Customer password
     * @returns Promise<AccountPage> - Authenticated account page object
     */
    async login(email: string, password: string): Promise<AccountPage> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        return new AccountPage(this.page);
    }

      /**
     * Checks if the warning message is visible
     * @returns Promise<boolean> - true if warning is displayed
     */
    async isWarningMessageVisible(): Promise<boolean> {
        try {
            return await this.warningMessage.isVisible();
        } catch (error) {
            console.log(`Error checking warning message: ${error}`);
            return false;
        }
    }

      /**
     * Gets the warning/error message text
     * @returns Promise<string> - The warning message text
     */
    async getWarningMessage(): Promise<string> {
        return await this.warningMessage.textContent() ?? '';
    }

       /**
     * Checks if the Login page is displayed
     * @returns Promise<boolean> - true if the heading is visible
     */
    async isLoginPageExists(): Promise<boolean> {
        try {
            return await this.loginHeading.isVisible();
        } catch (error) {
            console.log(`Error checking login page: ${error}`);
            return false;
        }
    }
}
