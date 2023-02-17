// const PORT = process.env.port || 10000;

const production = `https://patientor-ccvj.onrender.com`;
const local = "http://localhost:3001";

const url = process.env.NODE_ENV === "production" ? production : local;
export const apiBaseUrl = `${production}/api`;
