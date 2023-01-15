import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        id: string;
        entry: Entry;
      };
    }
  | {
      type: "SET_PATIENT_DIAGNOSES";
      payload: Array<Diagnosis["code"]>;
    }
  | {
      type: "RESET_PATIENT_DIAGNOSES";
    };

export const resetPatientDiagnoses = () => {
  return {
    type: "RESET_PATIENT_DIAGNOSES",
  };
};

export const setPatientDiagnoses = (
  patientDiagnoses: Array<Diagnosis["code"]>
): Action => {
  return {
    type: "SET_PATIENT_DIAGNOSES",
    payload: patientDiagnoses,
  };
};

export const addEntry = (id: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { id, entry },
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload,
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: [
              ...state.patients[action.payload.id].entries,
              action.payload.entry,
            ],
          },
        },
      };
    case "SET_PATIENT_DIAGNOSES":
      return {
        ...state,
        patientDiagnosesCodes: action.payload,
      };
      break;
    case "RESET_PATIENT_DIAGNOSES":
      return {
        ...state,
        patientDiagnosesCodes: [],
      };
      break;
    default:
      return state;
  }
};
