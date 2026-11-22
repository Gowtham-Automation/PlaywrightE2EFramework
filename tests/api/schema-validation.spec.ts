import { test, expect } from '@playwright/test';
import { Routes } from '../../api/endpoints/routes.js';
import { DataProvider } from '../../utils/DataReader.js';
import { Ajv } from 'ajv';
import type { AnySchema } from 'ajv';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const ajv = new Ajv();

test.describe('JSON Schema Validation Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const CART_ID = Number(process.env.CART_ID ?? 1);

    // ---------------------------------------------------------
    // Product Response Schema
    // ---------------------------------------------------------

    test('Product Response Schema Validation @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        const schemaPath = path.resolve(currentDirectory, '../../api/schemas/product_api_schema.json');
        const schema = DataProvider.readJson<AnySchema>(schemaPath);

        const validate = ajv.compile(schema);
        const isValid = validate(responseBody);

        if (!isValid) {
            console.log('Product Schema Validation Errors:', JSON.stringify(validate.errors, null, 2));
        }

        expect(isValid).toBeTruthy();
    });

    // ---------------------------------------------------------
    // User Response Schema
    // ---------------------------------------------------------

    test('User Response Schema Validation @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID))}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        const schemaPath = path.resolve(currentDirectory, '../../api/schemas/user_api_schema.json');
        const schema = DataProvider.readJson<AnySchema>(schemaPath);

        const validate = ajv.compile(schema);
        const isValid = validate(responseBody);

        if (!isValid) {
            console.log('User Schema Validation Errors:', JSON.stringify(validate.errors, null, 2));
        }

        expect(isValid).toBeTruthy();
    });

    // ---------------------------------------------------------
    // Cart Response Schema
    // ---------------------------------------------------------

    test('Cart Response Schema Validation @master @regression @api', async ({ request }) => {

        const response = await request.get(`${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID))}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        const schemaPath = path.resolve(currentDirectory, '../../api/schemas/cart_api_schema.json');
        const schema = DataProvider.readJson<AnySchema>(schemaPath);

        const validate = ajv.compile(schema);
        const isValid = validate(responseBody);

        if (!isValid) {
            console.log('Cart Schema Validation Errors:', JSON.stringify(validate.errors, null, 2));
        }

        expect(isValid).toBeTruthy();
    });
});