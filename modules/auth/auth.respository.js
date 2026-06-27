import pool from "../../db/pool.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

class AuthRepository {
    async login(body) {
        try {
            const data = await pool.query(
                `
                SELECT * FROM users WHERE email=$1 
                `,
                [body.email]
            )
            // compare the password
            if (data.rows.length === 0) {
                return null;
            }
            const user = data.rows[0];
            const isMatch = await bcrypt.compare(body.password, user.password);
            if (!isMatch) {
                return null;
            }
            // generate jwt token
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })
            return {
                ...user,
                token
            };
        } catch (e) {
            throw e
        }
    }


    async signup(body) {
        try {
            let hashPassword = await bcrypt.hash(body.password, 10);
            const data = await pool.query(
                `
                INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;
                `,
                [body.name, body.email, hashPassword]
            )
            return data.rows[0];
        } catch (e) {
            throw e
        }
    }

    async profile(id) {
        try {
            const data = await pool.query(
                `
                SELECT * FROM users WHERE id=$1
                `,
                [id]
            )
            // if data not found
            if (data.rows.length === 0) {
                return null;
            }
            console.log(data)
            return data.rows[0];
        } catch (e) {
            throw e
        }
    }

}

export default new AuthRepository();