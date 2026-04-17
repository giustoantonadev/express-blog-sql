const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'express_blog_sql',
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10,
    queueLimit: 0,
});

// Log basic connection info (no password)
console.log('DB pool created:', {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'express_blog_sql',
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10,
});

async function query(sql, params) {
    const [rows] = await pool.execute(sql, params);
    return rows;
}

async function testConnection() {
    const conn = await pool.getConnection();
    try {
        await conn.ping();
        console.log('testConnection: ping successful');
        return true;
    } finally {
        conn.release();
    }
}

module.exports = { pool, query, testConnection };