import { config } from 'dotenv';
import path from 'path';

const dotenvAbsolutePath = path.join(__dirname, `../../.env.development.local`);
const res = config({ path: dotenvAbsolutePath });

if (res.error) {
  if (process.env.NODE_ENV !== 'production') {
    throw res.error;
  }
}

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, LOG_FORMAT, LOG_DIR, DB_PORT, DB_DATABASE, SECRET_KEY, ORIGIN, EXPIRES_IN_1_HOUR, EXPIRES_IN_6_MONTH } =
  process.env;
