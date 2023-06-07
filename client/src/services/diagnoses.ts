import axios from 'axios';
import { API_BASE_URI } from '../constants';
import { Diagnosis } from '../types/types';

const fetchDiagnosesFromApi = async (token?: string) => {
  let response;
  try {
    if (token) {
      response = await axios.get<Diagnosis[]>(`${API_BASE_URI}/diagnoses`, {
        headers: { Authorization: `bearer ${token}` },
      });
    } else {
      response = await axios.get<Diagnosis[]>(`${API_BASE_URI}/diagnoses`);
    }
    if (response.status === 200) return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { fetchDiagnosesFromApi };
