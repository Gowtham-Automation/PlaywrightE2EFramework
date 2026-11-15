import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function executeQuery(sql: string, params?: any[]) {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const database = process.env.DB_NAME;
    if (!host || !user || !database) {
        throw new Error('DB_HOST, DB_USER, and DB_NAME must be set to execute database queries.');
    }

    const port = process.env.DB_PORT;
    const password = process.env.DB_PASSWORD;
    const connection = await mysql.createConnection({
        host,
        ...(port ? { port: Number(port) } : {}),
        user,
        ...(password !== undefined ? { password } : {}),
        database
    });

    const [result] = await connection.execute(sql, params);
    await connection.end();
    return result;
}