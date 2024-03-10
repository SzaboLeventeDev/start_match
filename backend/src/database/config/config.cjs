/**
 * Sequelize config for postgres database
 */
const dotenv = require("dotenv");
const path = require("path");

const env = process.env.NODE_ENV || "development";

let envPath = path.resolve(process.cwd(), `.env.${env}.local`);

if (!fs.existsSync(envPath)) {
  envPath = path.resolve(process.cwd(), `.env.${env}`);
}

const result = dotenv.config({ path: envPath });
if(result.error) {
  logger.error("Database error: " - Date.now() - result.error)
}

module.exports = {
  [env]: {
    username: process.env.POSTGRES_USER || "user",
    password: process.env.POSTGRES_PASSWORD  || "password",
    database: process.env.POSTGRES_DB || "database",
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
  },
};
