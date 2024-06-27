import fs from 'fs';
import path from 'path';
import { configDotenv } from 'dotenv';
import { CorsOptions } from 'cors';

export const env = process.env.NODE_ENV || 'development';

let envPath = path.resolve(process.cwd(), `.env.${env}.local`);

if (!fs.existsSync(envPath)) {
  envPath = path.resolve(process.cwd(), `.env.${env}`);
}

configDotenv({ path: envPath });

type Config = {
  port: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
  isSessionCookieSecure: boolean;
  corsOptions: CorsOptions;
};

const config: Config = {
  port: parseInt(process.env.BACKEND_PORT || '8080', 10),
  dbName: process.env.POSTGRES_DB || 'database',
  dbUser: process.env.POSTGRES_USER || 'user',
  dbPassword: process.env.POSTGRES_PASSWORD || 'password',
  dbHost: process.env.POSTGRES_HOST || 'localhost',
  isSessionCookieSecure: process.env.SESSION_COOKIE_SECURE !== 'false',
  corsOptions: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    preflightContinue: false,
  },
};

export default config;
