import { config } from 'dotenv';
config({ path: `.env` });
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, DATABASE_URL } = process.env;