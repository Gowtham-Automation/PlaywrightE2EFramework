import type { Locator, Page } from '@playwright/test';

export interface CustomerRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
}

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly pageHeading: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly editAccountLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.pageHeading = page.getByRole('heading', { name: 'Register Account' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.getByPlaceholder('E-Mail');
        this.telephoneInput = page.getByPlaceholder('Telephone');
        this.passwordInput = page.getByPlaceholder('Password', { exact: true });
        this.confirmPasswordInput = page.getByPlaceholder('Password Confirm');
        this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.editAccountLink = page.getByRole('link', { name: 'Edit Account' });
    }

    /**
     * Checks whether the registration page is displayed.
     * @returns Promise<boolean> - true when the registration heading is visible
     */
    async isRegistrationPageExists(): Promise<boolean> {
        return this.pageHeading.isVisible();
    }

    /**
     * Fills the customer registration fields.
     * @param customer - Customer details to register
     */
    async fillRegistrationForm(customer: CustomerRegistrationData): Promise<void> {
        await this.firstNameInput.fill(customer.firstName);
        await this.lastNameInput.fill(customer.lastName);
        await this.emailInput.fill(customer.email);
        await this.telephoneInput.fill(customer.telephone);
        await this.passwordInput.fill(customer.password);
        await this.confirmPasswordInput.fill(customer.password);
    }

    /**
     * Accepts the privacy policy.
     */
    async acceptPrivacyPolicy(): Promise<void> {
        await this.privacyPolicyCheckbox.check();
    }

    /**
     * Submits the registration form.
     */
    async submitRegistration(): Promise<void> {
        await this.continueButton.click();
    }

    /**
     * Checks whether the account-created confirmation is displayed.
     * @returns Promise<boolean> - true when registration succeeds
     */
    async isAccountCreatedPageExists(): Promise<boolean> {
        return this.page.getByRole('heading', { name: 'Your Account Has Been Created!' }).isVisible();
    }

    /**
     * Checks whether account navigation is available for the new customer.
     * @returns Promise<boolean> - true when the authenticated account link is visible
     */
    async isAccountNavigationAvailable(): Promise<boolean> {
        return this.editAccountLink.isVisible();
    }
}
