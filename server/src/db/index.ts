
import "dotenv/config"
import { Pool } from "pg";

const pool = new Pool({
    user: process.env.db__user!,
    database: process.env.db_name!,
    password: process.env.db_password!,
    port: 5432,
    host: 'localhost',
})

export default pool