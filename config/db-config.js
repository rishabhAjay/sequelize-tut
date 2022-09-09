import { HOST, DB, PASSWORD, dialect, USER } from "../utils/constants.js";
export const config = {
  HOST,
  USER,
  PASSWORD,
  DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
