const PORT = process.env.port || 3001;
// const productionPORT = process.env.PORT || 10000;
const production = `https://patientor-server-docker.onrender.com`;
const local = `http://localhost:${PORT}`;
let url;
const REACT_ENV = process.env.REACT_APP_REACT_ENV;

if(REACT_ENV !== undefined) {
  url = REACT_ENV === 'development' ? local : production;
} else {
  url = process.env.NODE_ENV === 'production' ? production : local;
}

export const API_BASE_URI = `${url}/api`;
