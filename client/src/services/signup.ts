import axios from 'axios';

// Constants
import { API_BASE_URI } from '../constants';

interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const signUp = async (credentials: Credentials) => {
  const response = await axios.post(`${API_BASE_URI}/signup`, credentials);

  return response.data;
};

export default { signUp };
