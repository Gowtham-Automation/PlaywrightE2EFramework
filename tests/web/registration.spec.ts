/**
 * Test Case: Successful customer registration
 *
 * Tags: @master @sanity @web
 *
 * Steps:
 * 1) Open the My Account menu and navigate to Register
 * 2) Complete and submit registration with unique customer data
 * 3) Verify registration confirmation and authenticated account navigation
 */
import { test, expect } from '../../fixtures/pageFixtures.js';
import { RandomDataUtil } from '../../utils/dataGenerator.js';

test('User registration test @master @sanity @web @registration', async ({ homePage, registerPage }) => {
    const customer = RandomDataUtil.generateCustomerRegistrationPayload();
    customer.email = customer.email.replace('@', `+${Date.now()}@`);

    await test.step('1) Navigate to the registration page(My Account → Register)', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
    });

    await test.step('2) Verify the registration page is displayed', async () => {
        await expect.poll(() => registerPage.isRegistrationPageExists()).toBeTruthy();
    });

    await test.step('3) Fill the registration form with unique data', async () => {
        await registerPage.fillRegistrationForm(customer);
    });

    await test.step('4) Accept the Privacy Policy', async () => {
        await registerPage.acceptPrivacyPolicy();
    });

    await test.step('5) Submit registration', async () => {
        await registerPage.submitRegistration();
    });

    await test.step('6) Verify registration succeeded and account navigation is available', async () => {
        await expect.poll(() => registerPage.isAccountCreatedPageExists()).toBeTruthy();
        expect(await registerPage.isAccountNavigationAvailable()).toBeTruthy();
    });

    console.log('✅ Customer registration completed successfully.');
});
