import dotenv from "dotenv";
import { exec } from "child_process";
import util from "util";
const execution = util.promisify(exec);

dotenv.config();
export const PORT = process.env.PORT || 4000;

export const HOST = process.env.HOST;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const DB = process.env.DB;
export const DSN = process.env.DSN;
let sentryVersion;

const test = async () => {
  const { stdout, stderr } = await execution("echo test");
  if (stderr) {
    return stderr;
  }
  return stdout;
};

const hello = exec(
  "npx sentry-cli releases propose-version",
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    return stdout;
  }
);
console.log("hello..........", hello);
export const VERSION = test();
export const dialect = "mysql";
