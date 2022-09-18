import dotenv from "dotenv";
import { exec } from "child_process";
dotenv.config();
export const PORT = process.env.PORT || 4000;

export const HOST = process.env.HOST;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const DB = process.env.DB;
export const DSN = process.env.DSN;

export const VERSION = (cmd) => {
  return new Promise((resolve, reject) => {
    exec("npx sentry-cli releases propose-version", (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
        reject();
      }
      resolve(stdout);
    });
  });
};
// exec(, (error, stdout, stderr) => {
//   if (error) {
//     console.log(`error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.log(`stderr: ${stderr}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   sentryVersion = stdout;
// });

export const dialect = "mysql";
