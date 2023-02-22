import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

const fetchDiagnosesFromApi = async (token?: string) => {
  let response;
  try {
    if (token) {
      response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`, {
        headers: { Authorization: `bearer ${token}` },
      });
    } else {
      response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    }
    if (response.status === 200) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { fetchDiagnosesFromApi };
