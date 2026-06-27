import pool from "../db/pool.js";

async function UserTable(){
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

UserTable()