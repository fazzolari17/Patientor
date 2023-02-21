import axios from 'axios';

// Constants
import { apiBaseUrl } from '../constants';

// Types
import { ILoginCredentials } from '../types';

const login = async (credentials: ILoginCredentials) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/login`, credentials);

    return response.data;
  } catch (error) {
    return console.log(error);
  }
};

export default { login };
