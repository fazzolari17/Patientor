
import data from '../data/patients';
import {
  PatientEntry,
  NewPatientEntry,
  NewEntry,
  MongoPatient,
  MongoDocument,
} from '../types';

import Patient from '../models/patient';

const patientData: Array<PatientEntry> = data;

const findPatient = async (id: string): Promise<PatientEntry | null> => {
  try {
    return await Patient.findById(id);
  } catch (error: unknown) {
    const message = `Error retrieving patient from database: ${error}`;
    
    throw new Error(message);
  }

};

const addNewPatient = async (entry: NewPatientEntry): Promise<PatientEntry> => {

  const patient = new Patient({
    name: entry.name,
    dateOfBirth: entry.dateOfBirth,
    ssn: entry.ssn,
    gender: entry.gender,
    occupation: entry.occupation,
    entries: entry.entries
  });

  const response = await patient.save();

  return response;
};

const getNonSensitivePatientEntries = async () => {

  const response = Patient.find({}, { 'ssn': 0 });

  return response;
};

const getPatientEntries = (): MongoPatient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
      ssn,
    })
  );
};

const addNewEntry = async (id: string, entry: NewEntry): Promise<MongoDocument | null> => {
  try {

    const updatedPatient = await Patient.findByIdAndUpdate(id,
      { $push: { entries: entry } }, { new: true }) as MongoDocument;
    return updatedPatient;
  } catch (error: unknown) {
    const message = `Error retrieving patient from database: ${error}`;
    
    throw new Error(message);
  }
  const person = patientData.find((person) => person.id === id);
  if (person === undefined) {
    throw new Error('Person Not Found');
  }
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addNewPatient,
  findPatient,
  addNewEntry,
};
