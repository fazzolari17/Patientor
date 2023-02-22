import { Diagnosis, Entry, Gender, Patient } from '../types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member : ${JSON.stringify(value)}`
  );
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('string value is incorrect');
  }
  return text;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Missing Gender`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Missing occupation`);
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`SSN is missing or is incorrect`);
  }
  return ssn;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (description: string, date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${description}: ${date}`);
  }
  return date;
};

type fields = {
  id: unknown;
  name: unknown;
  dateOfBirth?: unknown;
  ssn?: unknown;
  occupation: unknown;
  gender: unknown;
  entries: Entry[];
};

export const parseRecievedData = ({
  id,
  name,
  dateOfBirth,
  ssn,
  occupation,
  gender,
  entries,
}: fields) => {
  const patient: Patient = {
    id: parseString(id),
    name: parseString(name),
    dateOfBirth: parseDate('date of birth', dateOfBirth),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    entries,
  };

  return patient;
};

type MongoFields = {
  id: unknown;
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  occupation: unknown;
  gender: unknown;
};

interface MongoResponse {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  occupation: string;
  gender: string;
}

export const parseMongoReceivedData = ({
  id,
  name,
  dateOfBirth,
  ssn,
  occupation,
  gender,
}: MongoFields) => {
  const patient: MongoResponse = {
    id: parseString(id),
    name: parseString(name),
    dateOfBirth: parseDate('date of birth', dateOfBirth),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
  };

  return patient;
};

export const parseDiagnoses = (
  diagnoses: unknown
): Array<Diagnosis['code']> => {
  const codes: Array<Diagnosis['code']> = [];
  if (!diagnoses) {
    throw new Error('Incorrect or missing diagnoses information');
  }
  if (!Array.isArray(diagnoses)) {
    throw new Error('Diagnoses Codes needs to be an Array');
  }

  diagnoses.forEach((code) => {
    if (!isString(code)) {
      throw new Error('Code needs to be an Array of stings');
    }
    codes.push(code);
  });
  return codes;
};
