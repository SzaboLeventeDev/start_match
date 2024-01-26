import * as dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

const envPath = path.resolve(process.cwd(), `env.${env}`);

dotenv.config({ path: envPath });

type Config = {
  port: number;
};

const config: Config = {
  port: parseInt(process.env.BACKEND_PORT || '8080', 10),
};

export default config;
