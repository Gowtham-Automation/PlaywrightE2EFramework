import type { Locator, Page } from '@playwright/test';
import { ProductPage } from './ProductPage.js';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly searchHeading: Locator;
    private readonly productLinks: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.searchHeading = page.getByRole('heading', { name: /^Search - / });
        this.productLinks = page.locator('.product-thumb h4 a');
    }

    /**
     * Checks whether the product search results page is displayed.
     * @returns Promise<boolean> - true when the search heading is visible
     */
    async isSearchResultsPageVisible(): Promise<boolean> {
        return this.searchHeading.isVisible();
    }

    /**
     * Opens a product from the search results.
     * @param productName - Exact product name
     * @returns Promise<ProductPage> - Product details page object
     */
    async openProduct(productName: string): Promise<ProductPage> {
        const productHeading = this.page.getByRole('heading', { name: productName, exact: true });
        await productHeading.getByRole('link', { name: productName, exact: true }).click();
        return new ProductPage(this.page);
    }

      /**
     * Clicks on a product link in the search results
     * @param productName - The product name to click
     */
    async clickProduct(productName: string): Promise<void> {
        await this.productLinks.filter({ hasText: productName }).first().click();
        await this.page.waitForLoadState('networkidle');
    }

     /**
     * Checks if the search results page is displayed
     * @returns Promise<boolean> - true if search results heading is visible
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            return await this.searchHeading.isVisible();
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
            return false;
        }
    }

     /**
     * Checks if a product appears in the search results
     * @param productName - The product name to look for
     * @returns Promise<boolean> - true if the product is found
     */
    async isProductDisplayed(productName: string): Promise<boolean> {
        try {
            const count = await this.productLinks.filter({ hasText: productName }).count();
            return count > 0;
        } catch (error) {
            console.log(`Error checking product display: ${error}`);
            return false;
        }
    }

     /**
     * Gets the search results heading text
     * @returns Promise<string> - The heading text
     */
    async getSearchHeadingText(): Promise<string> {
        return await this.searchHeading.textContent() ?? '';
    }
}
