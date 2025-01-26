import * as dotenv from 'dotenv';
import mysql from "mysql2/promise";

dotenv.config()

async function initializeConnection() {
  return await mysql.createConnection({
    host: process.env.MSQL_HOST,
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : undefined,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
}

let connection: mysql.Connection;

(async () => {
  connection = await initializeConnection();
})();

export { connection };
