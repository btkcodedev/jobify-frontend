export const API_BASE_PATH = process.env.API_URL;
export const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID || '';
export const NOTIFICATION_BASE_PATH =
  process.env.MODE === 'dev'
    ? API_BASE_PATH?.replace('http', 'ws')
    : API_BASE_PATH?.replace('https', 'wss');
