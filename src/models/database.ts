import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const dbSQL = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

export {
    dbSQL,
};