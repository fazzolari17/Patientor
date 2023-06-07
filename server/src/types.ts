import { Document, Types } from 'mongoose';

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface MongoBaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  patient?: Types.ObjectId;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRick' = 2,
  'CriticalRisk' = 3,
}

export enum TypeSet {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck',
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export interface MongoPatient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export interface MongoDocument extends Document {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type AddNewPatient = Omit<PatientEntry, 'id' | 'entries'>;
export type NonSensitivePatientEntries = Omit<PatientEntry, 'ssn'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export interface IndividualHourlyForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface IndividualDailyForecastWeather {
  dt: string;
  dt_text: string;
  day: string;
  key: number;
  id: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: IndividualHourlyForecast['weather'][0];
}
