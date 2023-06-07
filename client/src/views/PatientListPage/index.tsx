import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Material ui
import { Box, Table, TableHead, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import { TableCell } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableBody } from '@material-ui/core';

// Types / Redux Store
import { Patient } from '../../types/types';
import { RootState } from '../../store';
import { PatientFormValues } from '../AddPatientModal/AddPatientForm';

// Components / Views
import SearchBar from './searchBar';
import AddPatientModal from '../AddPatientModal';
import HealthRatingBar from '../../components/HealthRatingBar';

// Redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { addNewPatient } from '../../reducers/patientReducer';

const PatientListPage = () => {
  const { patients } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [searchFilterValue, setSearchFilterValue] =
    React.useState<string>('name');
  const [genderFilterValue, setGenderFilterValue] = React.useState<string[]>(
    []
  );
  const [sortPatientList, setSortPatientList] = React.useState<string>('');

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      await dispatch(addNewPatient(values));
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

  const handleSortPatients = (
    sortCriteria: string,
    patients: Patient[]
  ): Patient[] => {
    if (!sortCriteria) {
      return patients;
    }
    sortCriteria = sortCriteria.toLowerCase();
    switch (sortCriteria) {
      case 'ascending':
        return [...patients].sort((a, b) => a.name.localeCompare(b.name));
      case 'decending':
        return [...patients].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return patients;
    }
  };

  const handleFilterByGender = (
    filter: string[],
    patients: Patient[]
  ): Patient[] => {
    if (genderFilterValue.length < 1) {
      return patients;
    } else {
      return patients.filter((patient) =>
        genderFilterValue.includes(patient.gender)
      );
    }
  };

  const handleSearch = (value: string, patients: Array<Patient>): Patient[] => {
    patients = handleFilterByGender(genderFilterValue, patients);
    patients = handleSortPatients(sortPatientList, patients);
    if (searchFilterValue === 'occupation') {
      return patients.filter((patient) => {
        const occupation = patient.occupation.toLowerCase();
        if (!value) return patient;

        if (occupation.includes(value)) {
          return patient;
        }
      });
    } else {
      return patients.filter((patient) => {
        const name = patient.name.toLowerCase();
        if (!value) return patient;

        if (name.includes(value)) {
          return patient;
        }
      });
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
        <Typography align="left" variant="h6">
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchFilterValue={searchFilterValue}
            setSearchFilterValue={setSearchFilterValue}
            genderFilterValue={genderFilterValue}
            setGenderFilterValue={setGenderFilterValue}
            sortPatientList={sortPatientList}
            setSortPatientList={setSortPatientList}
          />
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
          {Object.values(handleSearch(searchValue, patients)).map(
            (patient: Patient) => (
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
            )
          )}
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
