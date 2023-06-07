// Redux
import { createSlice, Dispatch } from '@reduxjs/toolkit';

// Types
import { NewEntry, Patient } from '../types/types';

// Services
import patientService from '../services/patients';
import { PatientFormValues } from '../views/AddPatientModal/AddPatientForm';

const initialState: Patient[] | [] = [];

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setAllPatients(state, action) {
      return (state = action.payload);
    },
    addPatient(state, action) {
      return [...state, action.payload];
    },
    updatePatient(state, action) {
      const updatedState = state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return (state = updatedState);
    },
    addEntryToPatient(state, action) {
      return [...state, { id: [action.payload.id], ...action.payload }];
    },
    resetPatients: () => initialState,
  },
});

export const fetchPatientList = (token?: string) => {
  return async (dispatch: Dispatch) => {
    try {
      localStorage.removeItem('patients');
      const response = await patientService.fetchAllPatients(token);
      if (response) {
        localStorage.setItem('patients', JSON.stringify(response));
        dispatch(setAllPatients(response));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchIndividualPatientDataAndUpdateState = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const patient = await patientService.fetchIndividualPatientData(id);
      if (!patient) return;
      dispatch(updatePatient(patient));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addNewPatient = (values: PatientFormValues) => {
  return async (dispatch: Dispatch) => {
    try {
      const patient = await patientService.addNewPatient(values);
      dispatch(addPatient(patient));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addNewDiagnosesToPatient = (id: string, values: NewEntry) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await patientService.addDiagnosesToPatient(id, values);
      dispatch(addEntryToPatient(response));

      const patients = await patientService.fetchAllPatients();
      dispatch(setAllPatients(patients));
    } catch (error) {
      console.error(error);
    }
  };
};

export const {
  setAllPatients,
  addPatient,
  addEntryToPatient,
  updatePatient,
  resetPatients,
} = patientSlice.actions;
export default patientSlice.reducer;
