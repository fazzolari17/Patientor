// Redux
import { Dispatch } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Types
import { Diagnosis } from '../types';

// Services
import diagnosesService from '../services/diagnoses';

interface InitialState {
  diagnoses: Diagnosis[] | [];
  patientDiagnosesCodes: Array<Diagnosis['code']> | [];
}
const initialState: InitialState = {
  diagnoses: [],
  patientDiagnosesCodes: [],
};

const diagnosesSlice = createSlice({
  name: 'diagnoses',
  initialState,
  reducers: {
    setDiagnoses(state, action) {
      const updatedState = {
        ...state,
        diagnoses: action.payload,
      };
      return (state = action.payload);
    },
    setPatientDiagnoses(state, action) {
      const updatedState = {
        ...state,
        patientDiagnosesCodes: [action.payload],
      };
      return (state = updatedState);
    },
    removeDiagnosesFromState(state, action) {
      return (state = action.payload);
    },
  },
});

export const useGetAllDiagnoses = (token?: string) => {
  return async (dispatch: Dispatch) => {
    try {
      localStorage.removeItem('diagnoses');
      const response = await diagnosesService.fetchDiagnosesFromApi(token);
      if (response) {
        localStorage.setItem('diagnoses', JSON.stringify(response));
        dispatch(setDiagnoses(response));
      }
    } catch (error) {}
  };
};

export const useSetPatientDiagnoses = (codes: Array<Diagnosis['code']>) => {
  return (dispatch: Dispatch) => {
    dispatch(setPatientDiagnoses(codes));
  };
};

export const useRemoveDiagnosesFromState = () => {
  return (dispatch: Dispatch) => {
    dispatch(removeDiagnosesFromState(initialState));
  };
};

export const { setDiagnoses, setPatientDiagnoses, removeDiagnosesFromState } =
  diagnosesSlice.actions;
export default diagnosesSlice.reducer;
