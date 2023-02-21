const PORT = process.env.port || 3001;

const production = `https://patientor-ccvj.onrender.com`;
const local = `http://localhost:${PORT}`;

const url = process.env.NODE_ENV === 'production' ? production : local;
export const apiBaseUrl = `${url}/api`;
