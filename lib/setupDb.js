// lib/setupDb.js
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME || 'portfolio_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })

    // Visitors table
    await connection.query(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ip_address VARCHAR(45),
      user_agent TEXT,
      page_visited VARCHAR(255),
      referrer VARCHAR(500),
      country VARCHAR(100),
      city VARCHAR(100),
      device_type VARCHAR(50),
      browser VARCHAR(100),
      session_id VARCHAR(100),
      visit_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

    // Daily stats table
    await connection.query(`
    CREATE TABLE IF NOT EXISTS daily_stats (
      id INT AUTO_INCREMENT PRIMARY KEY,
      visit_date DATE UNIQUE,
      total_visits INT DEFAULT 0,
      unique_visitors INT DEFAULT 0,
      avg_time_on_site INT DEFAULT 0,
      bounce_rate DECIMAL(5,2) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

    // Admin users table
    await connection.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) UNIQUE,
      email VARCHAR(255) UNIQUE,
      password_hash VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

    // Insert default admin (username: admin, password: DevToStack@123)
    const hashedPassword = await bcrypt.hash('DevToStack@123', 10)
    await connection.query(`
    INSERT IGNORE INTO admin_users (username, email, password_hash)
    VALUES ('admin', 'admin@portfolio.com', ?)
  `, [hashedPassword])

    console.log('Database setup completed successfully!')
    await connection.end()
}

setupDatabase().catch(console.error)