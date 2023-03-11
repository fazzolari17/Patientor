import axios from 'axios';

// Constants
import { API_BASE_URI } from '../constants';

// Types
import { Entry, NewEntry, Patient } from '../types';
import { PatientFormValues } from '../views/AddPatientModal/AddPatientForm';

const fetchAllPatients = async (token?: string) => {
  let response;
  try {
    if (token) {
      response = await axios.get<Patient[]>(`${API_BASE_URI}/patients`, {
        headers: { Authorization: `bearer ${token}` },
      });
    } else {
      response = await axios.get<Patient[]>(`${API_BASE_URI}/patients`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchIndividualPatientData = async (patientId: string) => {
  try {
    const { data: patient } = await axios.get<Patient>(
      `${API_BASE_URI}/patients/${patientId}`
    );
    return patient;
  } catch (error) {
    console.error(error);
  }
};

const addNewPatient = async (values: PatientFormValues) => {
  try {
    const { data: newPatient } = await axios.post<Patient>(
      `${API_BASE_URI}/patients`,
      values
    );
    return newPatient;
  } catch (error) {
    console.error(error);
  }
};

const addDiagnosesToPatient = async (paramId: string, newEntry: NewEntry) => {
  try {
    const { data }: { data: Entry } = await axios.put(
      `${API_BASE_URI}/patients/${paramId}/entries`,
      newEntry
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  fetchAllPatients,
  fetchIndividualPatientData,
  addNewPatient,
  addDiagnosesToPatient,
};
