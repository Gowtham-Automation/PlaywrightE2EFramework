import type { Locator, Page } from '@playwright/test';
import { CartPage } from './CartPage.js';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly productHeading: Locator;
    private readonly availability: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;
    private readonly successAlert: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.productHeading = page.locator('#content h1');
        this.availability = page.getByText('Availability: In Stock', { exact: true });
        this.quantityInput = page.getByRole('textbox', { name: 'Qty' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.successAlert = page.locator('.alert-success');
        this.successMessage = page.locator('.alert-success');
    }

    /**
     * Checks whether the requested product details are displayed.
     * @param productName - Expected product name
     * @returns Promise<boolean> - true when the matching heading is visible
     */
    async isProductDetailsVisible(productName: string): Promise<boolean> {
        return (await this.productHeading.innerText()).trim() === productName;
    }

    /**
     * Checks whether the product is available to purchase.
     * @returns Promise<boolean> - true when the product is in stock
     */
    async isProductInStock(): Promise<boolean> {
        return this.availability.isVisible();
    }

    /**
     * Reads the displayed product price.
     * @returns Promise<string> - Product price text
     */
    async getProductPrice(): Promise<string> {
        return (await this.page.getByRole('heading', { name: /^\$\d/ }).innerText()).trim();
    }

    /**
     * Sets the requested product quantity and adds it to the cart.
     * @param quantity - Quantity to add
     * @returns Promise<CartPage> - Cart page object for subsequent checks
     */
    async addToCart(quantity: string): Promise<CartPage> {
        await this.quantityInput.fill(quantity);
        await this.addToCartButton.click();
        return new CartPage(this.page);
    }

    /**
     * Checks whether the store confirms that a product was added to the cart.
     * @param productName - Product name shown in the confirmation
     * @returns Promise<boolean> - true when the success message contains the product
     */
    async isProductAddedToCart(productName: string): Promise<boolean> {
        return this.successAlert.getByText(productName, { exact: true }).isVisible();
    }

        /**
     * Checks if the product details page is displayed
     * @returns Promise<boolean> - true if the product heading is visible
     */
    async isProductPageExists(): Promise<boolean> {
        try {
            return await this.productHeading.isVisible();
        } catch (error) {
            console.log(`Error checking product page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the product name from the heading
     * @returns Promise<string> - The product name
     */
    async getProductName(): Promise<string> {
        return await this.productHeading.textContent() ?? '';
    }

     /**
     * Sets the quantity for the product
     * @param quantity - Quantity value
     */
    async setQuantity(quantity: string): Promise<void> {
        await this.quantityInput.clear();
        await this.quantityInput.fill(quantity);
    }

    /**
     * Clicks the Add to Cart button
     */
    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

     /**
     * Checks if the success message is visible
     * @returns Promise<boolean> - true if success message is displayed
     */
    async isSuccessMessageVisible(): Promise<boolean> {
        try {
            await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (error) {
            console.log(`Error checking success message: ${error}`);
            return false;
        }
    }

    /**
     * Gets the success message text after adding to cart
     * @returns Promise<string> - The success message text
     */
    async getSuccessMessage(): Promise<string> {
        return await this.successMessage.textContent() ?? '';
    }
}
