import pool from "../db/pool.js";

async function UserTable() {
    await pool.query(
        `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            email VARCHAR(300)NOT NULL UNIQUE,
            password VARCHAR(200) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `
    )
}

async function AlterUserTable() {
    await pool.query(
        `
        ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS profile_image VARCHAR(400) DEFAULT NULL 
        `
    )
}

// UserTable();
AlterUserTable();