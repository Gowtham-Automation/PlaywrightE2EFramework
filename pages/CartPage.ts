import type { Locator, Page } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly cartHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.cartHeading = page.getByRole('heading', { name: /Shopping Cart/ });
    }

    /**
     * Checks whether the shopping cart page is displayed.
     * @returns Promise<boolean> - true when the cart heading is visible
     */
    async isCartPageVisible(): Promise<boolean> {
        return this.cartHeading.isVisible();
    }

    private getProductRow(productName: string): Locator {
        return this.page.getByRole('row').filter({
            has: this.page.getByRole('link', { name: productName, exact: true }),
        });
    }

    /**
     * Checks whether the named product is present in the cart.
     * @param productName - Exact product name
     * @returns Promise<boolean> - true when the product row is visible
     */
    async isProductInCart(productName: string): Promise<boolean> {
        return this.getProductRow(productName).isVisible();
    }

    /**
     * Reads the quantity of a product in the cart.
     * @param productName - Exact product name
     * @returns Promise<string> - Cart quantity
     */
    async getProductQuantity(productName: string): Promise<string> {
        return this.getProductRow(productName).locator('input[name^="quantity"]').inputValue();
    }

    /**
     * Reads the product unit price from the cart.
     * @param productName - Exact product name
     * @returns Promise<string> - Unit price text
     */
    async getProductUnitPrice(productName: string): Promise<string> {
        return (await this.getProductRow(productName).getByRole('cell').nth(4).innerText()).trim();
    }

    /**
     * Reads the product line total from the cart.
     * @param productName - Exact product name
     * @returns Promise<string> - Line total text
     */
    async getProductLineTotal(productName: string): Promise<string> {
        return (await this.getProductRow(productName).getByRole('cell').nth(5).innerText()).trim();
    }

    /**
     * Reads the overall cart total.
     * @returns Promise<string> - Cart total text
     */
    async getCartTotal(): Promise<string> {
        const totalRow = this.page.getByRole('row').filter({
            has: this.page.getByText('Total:', { exact: true }),
        });
        return (await totalRow.getByRole('cell').last().innerText()).trim();
    }

    //   /**
    //  * Gets the quantity of a product in the cart
    //  * @returns Promise<string> - The quantity value
    //  */
    // async getProductQuantity(): Promise<string> {
    //     const value = await this.quantityInputs.first().getAttribute('value');
    //     return value ?? '';
    // }
}
