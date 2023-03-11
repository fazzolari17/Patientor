import axios from 'axios';
import history from '../router/history';

// Constants
import { API_BASE_URI } from '../constants';

// Types
import { ILoginCredentials } from '../types';

const login = async (credentials: ILoginCredentials) => {
  try {
    const response = await axios.post(`${API_BASE_URI}/login`, credentials);
    return response.data;
  } catch (error) {
    const { status, data } = error.response;
    const UNAUTHORIZED = 401;
    const BAD_REQUEST = 400;
    const message = data.error;

    if (status === UNAUTHORIZED) {
      alert(message);
      history.replace('/login');
      return;
    } else if (status === BAD_REQUEST) {
      alert(message);
      history.replace('/signup');
      return;
    }
    return;
  }
};

export default { login };
