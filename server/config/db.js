const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'vibrant_saas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 5000
});

async function checkConnection() {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        return { connected: true };
    } catch (error) {
        return { connected: false, error: error.message };
    }
}

module.exports = {
    pool,
    checkConnection
};
