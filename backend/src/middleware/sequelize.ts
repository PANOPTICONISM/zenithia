import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config()

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'ghost',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    dialect: 'mysql',
    models: [__dirname + './../models'],
  },
);

export default sequelize;