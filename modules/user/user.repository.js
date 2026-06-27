import pool from "../../db/pool.js";
//call db here

class UserRepository {
    async save(body) {
        try {
            const data = await pool.query(
                `
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
            `,
                [body.name, body.email, body.password]
            )
            return data.rows[0];
        } catch (e) {
            throw e
        }

    }

    async getAll() {
        const data = await pool.query(
            `
            SELECT * FROM users
            `
        )
        return data.rows;
    }

    async getUserById(id) {
        const data = await pool.query(
            `
            SELECT * FROM users WHERE id=$1
            `,
            [id]
        )
        return data.rows[0];
    }

    async updateUser(id, body) {
        const updateUser = await pool.query(
            `
            UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *;
            `, [body?.name, body?.email, id]
        )
        return updateUser.rows[0]
    }
}

export default new UserRepository()