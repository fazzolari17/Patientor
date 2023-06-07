import React from 'react';
import axios from 'axios';

// Router
import { useParams } from 'react-router-dom';

// Types
import { NewEntry, Patient } from '../../types/types';
import { RootState } from '../../store';
import { EntryFormValues } from '../../types/types';

// Components / Views
import PatientDetailsPage from './PatientDetailsPage';
import AddEntryModal from '../AddEntryModal';

// Utils
import { assertNever } from '../../utils/utils';

// Redux / Reducers
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import {
  addNewDiagnosesToPatient,
  fetchIndividualPatientDataAndUpdateState,
} from '../../reducers/patientReducer';

const PatientPage = () => {
  const paramId = useParams().id;
  const dispatch = useAppDispatch();
  const { patients } = useSelector((state: RootState) => state);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  let patient: Patient | undefined;
  const patientRef = React.useRef(patient);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  if (!paramId) throw new Error('missing parameter id');

  React.useEffect(() => {
    patientRef.current = patients.find((patient) => patient.id === paramId);
    if (!patientRef.current) {
      throw new Error('patient is not found');
    }
    dispatch(fetchIndividualPatientDataAndUpdateState(paramId));
  }, [dispatch, paramId, patient, patients]);

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
      dispatch(addNewDiagnosesToPatient(paramId, newEntry));
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
