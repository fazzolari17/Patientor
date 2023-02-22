import axios from 'axios';

// Constants
import { apiBaseUrl } from '../constants';

// Types
import { Entry, NewEntry, Patient } from '../types';
import { PatientFormValues } from '../views/AddPatientModal/AddPatientForm';


const fetchAllPatients = async (token?: string) => {
  let response;
  try {
    if (token) {
      response = await axios.get<Patient[]>(`${apiBaseUrl}/patients`, {
        headers: { Authorization: `bearer ${token}` },
      });
    } else {
      response = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
    }
    if (response.status === 200) return response.data;
    return;
  } catch (error) {
    console.error(error.response.data);
  }
};

const fetchIndividualPatientData = async (patientId: string) => {
  try {
    const { data: patient } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${patientId}`
    );
    return patient;
  } catch (error) {
    console.error(error.response.data);
  }
};

const addNewPatient = async (values: PatientFormValues) => {
  try {
    const { data: newPatient } = await axios.post<Patient>(
      `${apiBaseUrl}/patients`,
      values
    );
    return newPatient;
  } catch (error) {
    console.error(error.response.data);
  }
};

const addDiagnosesToPatient = async (paramId: string, newEntry: NewEntry) => {
  try {
    const { data }: { data: Entry } = await axios.put(
      `${apiBaseUrl}/patients/${paramId}/entries`,
      newEntry
    );
    return data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export default {
  fetchAllPatients,
  fetchIndividualPatientData,
  addNewPatient,
  addDiagnosesToPatient,
};
