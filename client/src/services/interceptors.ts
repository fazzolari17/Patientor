import axios from 'axios';
import { logout } from '../reducers/userReducer';
import store from '../store';

const UNAUTHORIZED = 401;
const { dispatch } = store; // direct access to redux store.

const interceptor = axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) return error;
    const { status, data } = error.response;

    if (status === UNAUTHORIZED) {
      if (data.error === 'token expired') {
        dispatch(logout('login'));
      }
    }

    return Promise.reject(error);
  }
);

export default interceptor;
