import mysql from "mysql2/promise";

export const connection = await mysql.createConnection({
  host: process.env.MSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
