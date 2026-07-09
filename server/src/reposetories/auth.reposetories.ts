
import pool from "../db";
import { user } from "../types/types";

class AuthRepositories {
    async create(data: user) {
        const { rows } = await pool.query("INSERT INTO users (username,email,password) values ($1,$2,$3) RETURNING *", [data.username, data.email, data.password])
        return rows[0]
    }
    async findByEmail(email: string) {
        const { rows } = await pool.query("SELECT * FROM users where email = $1", [email])
        return rows.length > 0 ? rows[0] : false
    }

    async findById(userId: number) {
        const res = await pool.query("SELECT * FROM users where id = $1", [userId])
        console.log(res);
    }
}

export const authRepositories = new AuthRepositories()  