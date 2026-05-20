// lib/db.js
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export async function query(sql, params) {
  const connection = await pool.getConnection()
  try {    
    const [results] = await connection.execute(sql, params)
    return results
  } finally {    
    connection.release()
  }
}

export default pool