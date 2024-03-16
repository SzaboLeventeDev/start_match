import { Sequelize } from "sequelize";
import config from "../config";

export const db = new Sequelize(
  config.dbName, 
  config.dbUser, 
  config.dbPassword, {
  host: config.dbHost,
  dialect: "postgres",
  timezone: "+02:00",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});