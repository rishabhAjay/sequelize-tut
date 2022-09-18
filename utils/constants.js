import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 4000;

export const HOST = process.env.HOST;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const DB = process.env.DB;
export const DSN = process.env.DSN;
export const VERSION = process.env.VERSION;
export const dialect = "mysql";
