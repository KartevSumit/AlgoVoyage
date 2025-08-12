import dotenv from 'dotenv';
dotenv.config(); 

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val || val.trim() === '') {
    throw new Error(`Missing required env var: ${key}`);
  }
  return val;
}

function requireEnvNumber(key: string): number {
  const raw = requireEnv(key);
  const n = Number(raw);
  if (Number.isNaN(n)) {
    throw new Error(`Env var ${key} must be a number. Got: ${raw}`);
  }
  return n;
}

export const PORT = requireEnvNumber('PORT');
export const DATABASE = requireEnv('DATABASE');

export const MAIL_HOST = requireEnv('MAIL_HOST');
export const MAIL_PORT = requireEnvNumber('MAIL_PORT'); 
export const MAIL_USER = requireEnv('MAIL_USER');
export const MAIL_PASS = requireEnv('MAIL_PASS');

export const JWT_SECRET = requireEnv('JWT_SECRET');

export const GOOGLE_CLIENT_ID = requireEnv('GOOGLE_CLIENT_ID');
export const GOOGLE_CLIENT_SECRET = requireEnv('GOOGLE_CLIENT_SECRET');

export const CLIST_USERNAME = requireEnv('CLIST_USERNAME');
export const CLIST_API_KEY = requireEnv('CLIST_API_KEY');

export const MAIL_TRANSPORT_OPTIONS = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_PORT === 465, 
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
};
