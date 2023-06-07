const PORT = process.env.port || 3001;
// const productionPORT = process.env.PORT || 10000;
const production = `https://patientor-ccvj.onrender.com`;
const local = `http://localhost:${PORT}`;

const url = process.env.NODE_ENV === 'production' ? production : local;

export const API_BASE_URI = `${url}/api`;
