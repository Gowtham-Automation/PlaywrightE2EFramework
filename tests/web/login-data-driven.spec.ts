/**
 * Test Case: Login Flow (Data Driven using External File)
 *
 * Tags: @master @datadriven @regression
 *
 * Steps:
 * 1) Load test data from external file
 * 2) For each row, create an independent test
 * 3) Open the application
 * 4) Enter email and password from data row
 * 5) Submit the login form
 * 6) Validate result based on expected value
 */

import { test, expect } from '../../fixtures/pageFixtures.js';
import { DataProvider } from '../../utils/DataReader.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface LoginDataRow {
    testName: string;
    email: string;
    password: string;
    expected: string;
}

const currentFile = fileURLToPath(import.meta.url);
const loginData: LoginDataRow[] = DataProvider.readJson(
    // The test data file is expected to contain login rows matching this interface.
    path.resolve(path.dirname(currentFile), '../../testdata/opencart_logindata.json'),
);

loginData.forEach((data, index) => {
    test(`Login Data Driven - ${data.testName} [row ${index + 1}] @datadriven @master @web`, async ({ homePage, loginPage }) => {

        await test.step('1) Open the application and navigate to login', async () => {
            await homePage.clickLogin();
        });

        await test.step('2) Enter credentials from test data', async () => {
            const email = data.email.trim();
            const password = data.password.trim();

            const accountPage = await loginPage.login(email, password);
            if (data.expected === 'success') {
                expect(await accountPage.isMyAccountPageExists()).toBeTruthy();
            } else {
                const isWarning = await loginPage.isWarningMessageVisible();
                expect(isWarning).toBeTruthy();

                const warningText = await loginPage.getWarningMessage();
                expect(warningText).toContain('Warning');
            }
        });

        console.log(`✅ Login Data Driven - ${data.testName} completed!`);
    });
});