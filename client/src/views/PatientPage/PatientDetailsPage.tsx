import React from 'react';

// Material ui / Icons
import { Button } from '@material-ui/core';
import { Stack } from '@mui/material';
import { IconContext } from 'react-icons';
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs';

// Utils
import { nanoid } from 'nanoid';
import { parseString } from '../../utils/utils';

// Redux
import { useSelector } from 'react-redux';

// Components / Views
import EntryDetails from '../../components/EntryDetails';

// Types
import { RootState } from '../../store';
import { Diagnosis, Entry, Patient } from '../../types/types';

interface IProps {
  id: string;
  openModal: () => void;
}
const PatientDetailsPage = ({ id, openModal }: IProps) => {
  const { patients, diagnoses } = useSelector((state: RootState) => state);
  const patient = patients.find((patient) => patient.id === id);

  const [patientDiagnosesCodes, setPatientDiagnosesCodes] = React.useState<
    string[]
  >([]);

  if (!patient) throw new Error('patient is not found');

  let codes: JSX.Element[] | [] = [];
  let entry: JSX.Element[] | [] = [];

  React.useEffect(() => {
    setDiagnosesCodesArray(patient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient, patients]);

  const stringParserMessage = (id: string) => {
    return `misssing or incorrect string on patientListPage ${id}`;
  };

  const setDiagnosesCodesArray = (patient: Patient): void => {
    const { entries } = patient;
    const codes: Array<Diagnosis['code']> = [];
    entries.forEach((entry) => {
      if (entry.diagnosisCodes) {
        for (let i = 0; i < entry.diagnosisCodes.length; i++) {
          const item = parseString(
            stringParserMessage(`${entry}`),
            entry.diagnosisCodes[i]
          );
          codes.push(item);
        }
      }
    });
    setPatientDiagnosesCodes(codes);
  };

  const renderCodes = () => {
    codes = patientDiagnosesCodes.map((item: string) => {
      const O = Object.values(diagnoses);
      const description = O.find((diagnoses) => diagnoses.code === item);
      return description === undefined ? (
        <li key={nanoid()}>{`${item} - Diagnoses Name Not Found`}</li>
      ) : (
        <li key={nanoid()}>{`${item} - ${description.name}`}</li>
      );
    });
    return codes;
  };

  const renderEntries = () => {
    entry = patient.entries.map((entry: Entry) => (
      <EntryDetails key={nanoid()} entry={entry}></EntryDetails>
    ));
    return entry;
  };

  const renderGenderIcon = () => {
    const genderIconDecider =
      patient.gender === 'male' ? <BsGenderMale /> : <BsGenderFemale />;

    const genderIcon = (
      <IconContext.Provider value={{ color: 'red' }}>
        {genderIconDecider}
      </IconContext.Provider>
    );
    return genderIcon;
  };

  return (
    <>
      <h3>
        {patient.name} {renderGenderIcon()}
      </h3>
      <p>SSN: {patient.ssn}</p>
      <p>OCCUPATION: {patient.occupation}</p>
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <p>Entries</p>
      <ul>{renderCodes()}</ul>
      <Stack spacing={3}>{renderEntries()}</Stack>
    </>
  );
};

export default PatientDetailsPage;
