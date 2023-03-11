export interface ILoggedInUser {
  firstName: string | null;
  lastName: string | null;
  id: string | null;
  email: string | null;
  weatherLocationData: ApiGeocodeResults | null;
}

export interface ILoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface User {
  email: string;
  password: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
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
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: healthCheckRating;
}

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;

export interface NewBaseEntry {
  date: string;
  description: string;
  specialist: string;
  diagnosesCodes?: Array<Diagnosis['code']>;
}

interface NewHospitalEntry extends NewBaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

interface NewOccupationalHealthcareEntry extends NewBaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
}

interface NewHealthCheckEntry extends NewBaseEntry {
  type: 'HealthCheck';
  healthCheckRating: number;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum healthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type EntryFormValues =
  | HospitalFormValues
  | OccupationalHealthcareFormValues
  | HealthCheckFormValues;

export interface BaseEntryFormValues {
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalFormValues extends BaseEntryFormValues {
  type: 'Hospital';
  dischargeDate: string;
  dischargeCriteria: string;
}

interface OccupationalHealthcareFormValues extends BaseEntryFormValues {
  type: 'OccupationalHealthcare';
  employerName: string;
}

interface HealthCheckFormValues extends BaseEntryFormValues {
  type: 'HealthCheck';
  healthCheckRating: number;
}

// Weather Types / Interfaces

export interface ApiGeocodeResults {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
  id: string;
}

export interface WeatherData {
  timestamp: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed?: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface LocationData {
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
  id: string;
}
