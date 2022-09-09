import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 4000;

export const HOST = process.env.HOST;

export const USER = process.env.USERDB;
export const PASSWORD = process.env.PASSWORD;
export const DB = process.env.DB;
export const dialect = "mysql";
