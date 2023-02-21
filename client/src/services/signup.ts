import axios from 'axios';

// Constants
import { apiBaseUrl } from '../constants';

interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const signUp = async (credentials: Credentials) => {
  const response = await axios.post(`${apiBaseUrl}/signup`, credentials);

  return response.data;
};

export default { signUp };
