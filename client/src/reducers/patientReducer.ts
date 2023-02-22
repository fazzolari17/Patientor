// Redux
import { createSlice, Dispatch, current } from '@reduxjs/toolkit';

// Types
import { NewEntry, Patient } from '../types';

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
    removePatientsFromState(state, action) {
      return (state = action.payload)
    }
  },
});

export const useFetchPatientList = (token?: string) => {
  return async (dispatch: Dispatch) => {
    try {
      localStorage.removeItem('patients');
      const response = await patientService.fetchAllPatients(token);
      if (response) {
        dispatch(setAllPatients(response));
        localStorage.setItem('patients', JSON.stringify(response));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const useFetchIndividualPatientDataAndUpdateState = (id: string) => {
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

export const useAddNewPatient = (values: PatientFormValues) => {
  return async (dispatch: Dispatch) => {
    try {
      const patient = await patientService.addNewPatient(values);
      dispatch(addPatient(patient));
    } catch (error) {
      console.error(error);
    }
  };
};

export const useAddNewDiagnosesToPatient = (id: string, values: NewEntry) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await patientService.addDiagnosesToPatient(id, values);
      dispatch(addEntryToPatient(response));

      const patients = await patientService.fetchAllPatients();
      dispatch(setAllPatients(patients));
    } catch (error) {}
  };
};

export const useRemovePatientsFromState = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(removePatientsFromState(initialState))
    } catch (error) {
      
    }
  }
}

export const { setAllPatients, addPatient, addEntryToPatient, updatePatient, removePatientsFromState } =
  patientSlice.actions;
export default patientSlice.reducer;
