import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';

export class DataProvider {
    static readJson<T = unknown>(filePath: string): T {
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw) as T;
    }

    static readCsv(filePath: string) {
        const raw = fs.readFileSync(filePath);
        return parse(raw, {
            columns: true,
            skip_empty_lines: true
        });
    }

    static readExcel(filePath: string) {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
            throw new Error(`Excel file has no worksheets: ${filePath}`);
        }
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            throw new Error(`Could not read worksheet "${sheetName}" from Excel file: ${filePath}`);
        }
        return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    }
}