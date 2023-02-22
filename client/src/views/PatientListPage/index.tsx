import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Material ui
import { Box, Table, Button, TableHead, Typography } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableBody } from '@material-ui/core';

// Types / Redux Store
import { Patient } from '../../types';
import { RootState } from '../../store';
import { PatientFormValues } from '../AddPatientModal/AddPatientForm';

// Components / Views
import AddPatientModal from '../AddPatientModal';
import HealthRatingBar from '../../components/HealthRatingBar';

// Redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import {
  useAddNewPatient,
  useFetchPatientList,
} from '../../reducers/patientReducer';
import {
  useGetAllDiagnoses,
  useSetPatientDiagnoses,
} from '../../reducers/diagnosesReducer';

const PatientListPage = () => {
  const { patients } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      await dispatch(useAddNewPatient(values));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: '1em' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
