/**
 * Test Case: Complete customer shopping journey
 *
 * Tags: @master @end-to-end @web
 *
 * Steps:
 * 1) Register a new customer with generated details
 * 2) Log out and log back in with that customer
 * 3) Search for an available product and add it to the cart
 * 4) Verify the cart item, quantity, price, and total
 */
import { test, expect } from '../../fixtures/pageFixtures.js';
import { RandomDataUtil } from '../../utils/dataGenerator.js';
import { Helper } from '../../utils/helper.js';

test('End-to-end customer shopping flow @master @end-to-end @web @e2e', async ({
    homePage,
    registerPage,
    loginPage,
    accountPage,
    logoutPage,
    searchResultsPage,
    productPage,
    cartPage,
}) => {
    const customer = RandomDataUtil.generateCustomerRegistrationPayload();
    customer.email = customer.email.replace('@', `+${Date.now()}@`);
    const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

    await test.step('1) Register a new customer', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        await expect.poll(() => registerPage.isRegistrationPageExists()).toBeTruthy();

        await registerPage.fillRegistrationForm(customer);
        await registerPage.acceptPrivacyPolicy();
        await registerPage.submitRegistration();

        await expect.poll(() => registerPage.isAccountCreatedPageExists()).toBeTruthy();
        expect(await registerPage.isAccountNavigationAvailable()).toBeTruthy();
    });

    await test.step('2) Log out and confirm the logout page', async () => {
        await accountPage.logout();
        await expect.poll(() => logoutPage.isLogoutConfirmationVisible()).toBeTruthy();
        await logoutPage.continueToStore();
    });

    await test.step('3) Log back in with the newly created credentials', async () => {
        await homePage.clickLogin();
        const authenticatedAccount = await loginPage.login(customer.email, customer.password);
        await expect.poll(() => authenticatedAccount.isAccountDashboardVisible()).toBeTruthy();
    });

    await test.step('4) Search for the known available product', async () => {
        await homePage.searchProduct(productName);
        await expect.poll(() => searchResultsPage.isSearchResultsPageVisible()).toBeTruthy();
        await searchResultsPage.openProduct(productName);
        expect(await productPage.isProductDetailsVisible(productName)).toBeTruthy();
        expect(await productPage.isProductInStock()).toBeTruthy();
        expect(await productPage.getProductPrice()).toBe(totalPrice);
    });

    await test.step('5) Add the product to the cart', async () => {
        await productPage.addToCart(productQuantity);
        await expect.poll(() => productPage.isProductAddedToCart(productName)).toBeTruthy();
    });

    await test.step('6) Verify the cart item, quantity, and totals', async () => {
        await homePage.openShoppingCart();
        expect(await cartPage.isCartPageVisible()).toBeTruthy();
        expect(await cartPage.isProductInCart(productName)).toBeTruthy();
        expect(await cartPage.getProductQuantity(productName)).toBe(productQuantity);
        expect(await cartPage.getProductUnitPrice(productName)).toBe(totalPrice);
        expect(await cartPage.getProductLineTotal(productName)).toBe(totalPrice);
        expect(await cartPage.getCartTotal()).toBe(totalPrice);
    });

    console.log('✅ End-to-end customer shopping flow completed successfully.');
});
