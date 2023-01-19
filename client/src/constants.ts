const production = 'https://patientor-ccvj.onrender.com';
const local = 'http://localhost:3001';

const url = process.env.NODE_ENV === 'development' ? local : production;

export const apiBaseUrl = `${url}/api`;
