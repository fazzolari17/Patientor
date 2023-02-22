import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Types
import { NewEntry, Patient, Diagnosis } from '../../types';
import { RootState } from '../../store';
import { EntryFormValues } from '../../types';

// Components / Views
import PatientDetailsPage from './PatientDetailsPage';
import AddEntryModal from '../AddEntryModal';

// Utils
import { assertNever, parseString } from '../../utils/utils';

// Redux / Reducers
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import {
  useAddNewDiagnosesToPatient,
  useFetchIndividualPatientDataAndUpdateState,
} from '../../reducers/patientReducer';
import { setPatientDiagnoses } from '../../reducers/diagnosesReducer';

const PatientPage = () => {
  const paramId = useParams().id;
  const dispatch = useAppDispatch();
  const { user, patients, diagnoses } = useSelector(
    (state: RootState) => state
  );
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  let patient: Patient | undefined;

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  if (!paramId) throw new Error('missing parameter id');

  const setDiagnosesCodesArray = (patient: Patient): void => {
    const { entries } = patient;
    const codes: Array<Diagnosis['code']> = [];
    entries.forEach((entry) => {
      if (entry.diagnosisCodes) {
        for (let i = 0; i < entry.diagnosisCodes.length; i++) {
          const item = parseString(entry.diagnosisCodes[i]);
          codes.push(item);
        }
      }
    });
    dispatch(setPatientDiagnoses(codes));
  };

  React.useEffect(() => {
    patient = patients.find((patient) => patient.id === paramId);
    if (!patient) throw new Error('patient is not found');

    dispatch(useFetchIndividualPatientDataAndUpdateState(paramId));
    setDiagnosesCodesArray(patient);
  }, []);

  const submitNewEntry = async (values: EntryFormValues) => {
    let newEntry: NewEntry;
    if (!paramId) {
      throw new Error('User is not in Database');
    }

    switch (values.type) {
      case 'Hospital':
        newEntry = {
          type: 'Hospital',
          date: values.date,
          description: values.description,
          specialist: values.specialist,
          discharge: {
            date: values.dischargeDate,
            criteria: values.dischargeCriteria,
          },
        };
        if (!values.diagnosisCodes) {
          newEntry = { ...newEntry };
        } else {
          newEntry = {
            ...newEntry,
            diagnosesCodes: values.diagnosisCodes,
          };
        }
        break;
      case 'OccupationalHealthcare':
        newEntry = {
          type: 'OccupationalHealthcare',
          date: values.date,
          description: values.description,
          specialist: values.specialist,
          employerName: values.employerName,
        };
        if (!values.diagnosisCodes) {
          newEntry = { ...newEntry };
        } else {
          newEntry = {
            ...newEntry,
            diagnosesCodes: values.diagnosisCodes,
          };
        }
        break;
      case 'HealthCheck':
        newEntry = {
          type: 'HealthCheck',
          date: values.date,
          description: values.description,
          specialist: values.specialist,
          healthCheckRating: values.healthCheckRating,
        };
        if (!values.diagnosisCodes) {
          newEntry = { ...newEntry };
        } else {
          newEntry = {
            ...newEntry,
            diagnosesCodes: values.diagnosisCodes,
          };
        }
        break;
      default:
        return assertNever(values);
    }

    try {
      dispatch(useAddNewDiagnosesToPatient(paramId, newEntry));
      closeModal();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error?.response?.data || 'Unrecognized axios error');
        setError(
          String(error?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <>
      <PatientDetailsPage id={paramId} openModal={openModal} />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
    </>
  );
};

export default PatientPage;
