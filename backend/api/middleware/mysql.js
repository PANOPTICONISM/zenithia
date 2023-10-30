import mysql from "mysql2/promise";

export const connection = await mysql.createConnection({
  host: "roundhouse.proxy.rlwy.net",
  port: "50631",
  user: "root",
  password: "145E34c2dehd1gEA15Ac5D-C6eF6eAHa",
  database: "railway",
});
