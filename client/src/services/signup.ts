import axios from "axios";
import { apiBaseUrl } from "../constants";

interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const login = async (credentials: Credentials) => {
  const response = await axios.post(`${apiBaseUrl}/signup`, credentials);
  console.log(response.data);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
