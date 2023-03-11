import { GeoCodeData } from '../services/weatherService';
import { NewPatientEntry, Gender, NewEntry, Diagnoses } from '../types';
import { v4 as uuid } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (description: string, date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${description}: ${date}`);
  }

  return new Date(date).toISOString().split('T')[0];
};

export const parseString = (description: string, text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${description}`);
  }

  return text;
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const parseNumber = (description: string, number: unknown): number => {
  if (number === 0) {
    return number as number;
  }

  if (!number || !isNumber(number)) {
    throw new Error(`Incorrect or missing ${description}`);
  }

  return number;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  occupation: unknown;
  gender: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  occupation,
  gender,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString('name', name),
    dateOfBirth: parseDate('Date of Birth', dateOfBirth),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    entries: [],
  };

  return newEntry;
};

type EntryFields =
  | UtilsHospitalEntry
  | UtilsHealthcareEntry
  | UtilsOccupationalHealthcare;

interface BaseEntry {
  date: unknown;
  specialist: unknown;
  description: unknown;
  diagnosesCodes?: unknown;
}

interface UtilsHospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: unknown;
    criteria: unknown;
  };
}

interface UtilsHealthcareEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: unknown;
}

interface UtilsOccupationalHealthcare extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: unknown;
}

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (!healthCheckRating || typeof healthCheckRating !== 'number') {
    throw new Error('healthCheckRating is missing or incorrect');
  }
  return healthCheckRating;
};

const parseDiagnoses = (diagnoses: unknown): Array<Diagnoses['code']> => {
  const codes: Array<Diagnoses['code']> = [];
  if (!diagnoses) {
    throw new Error('Incorrect or missing diagnoses information');
  }
  // const dataCodes: Array<Diagnoses['code']> = typeof diagnoses === 'object' ? diagnoses : JSON.parse(diagnoses);
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

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member : ${JSON.stringify(value)}`,
  );
};

const toNewEntry = (entry: EntryFields): NewEntry => {
  let newEntry: NewEntry;
  const diagnoses = !entry.diagnosesCodes
    ? []
    : parseDiagnoses(entry.diagnosesCodes);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member : ${JSON.stringify(value)}`,
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return {
        date: parseDate('Hospital Entry Date', entry.date),
        type: 'Hospital',
        specialist: parseString('specialist', entry.specialist),
        description: parseString('description', entry.description),
        diagnosisCodes: diagnoses,
        discharge: {
          date: parseDate('Hospital Discharge date', entry.discharge.date),
          criteria: parseString('criteria', entry.discharge.criteria),
        },
      };
      // return newEntry;
      break;
    case 'OccupationalHealthcare':
      return {
        date: parseDate('Occupational Date', entry.date),
        type: 'OccupationalHealthcare',
        specialist: parseString('specialist', entry.specialist),
        description: parseString('description', entry.description),
        diagnosisCodes: diagnoses,
        employerName: parseString('employer name', entry.employerName),
      };

      break;
    case 'HealthCheck':
      return {
        date: parseDate('HealthCheck Date', entry.date),
        type: 'HealthCheck',
        specialist: parseString('specialist', entry.specialist),
        description: parseString('description', entry.description),
        diagnosisCodes: diagnoses,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
      return newEntry;
      break;
    default:
      return assertNever(entry);
  }
};

export default {
  toNewPatientEntry,
  toNewEntry,
};

export interface ResponseData {
  name: unknown;
  lat: unknown;
  lon: unknown;
  country: unknown;
  state: unknown;
}

export const parseGeoCodeResponse = ({
  name,
  lat,
  lon,
  country,
  state,
}: ResponseData): GeoCodeData => {
  const data: GeoCodeData = {
    name: parseString('geoCodeResponseName', name),
    lat: parseNumber('geoCodeResponselat', lat),
    lon: parseNumber('geoCodeResponselon', lon),
    country: parseString('geoCodeResponseCountry', country),
    state: parseString('geoCodeResponseState', state),
    id: uuid(),
  };

  return data;
};

export interface WeatherDataResponse {
  coord: {
    lon: unknown;
    lat: unknown;
  };
  weather: [
    {
      id: unknown;
      main: unknown;
      description: unknown;
      icon: unknown;
    },
  ];
  base: unknown;
  main: {
    temp: unknown;
    feels_like: unknown;
    temp_min: unknown;
    temp_max: unknown;
    pressure: unknown;
    humidity: unknown;
    sea_level: unknown;
    grnd_level: unknown;
  };
  visibility: unknown;
  wind: {
    speed: unknown;
    deg: unknown;
    gust?: unknown;
  };
  clouds: {
    all: unknown;
  };
  dt: unknown;
  sys: {
    type: unknown;
    id: unknown;
    country: unknown;
    sunrise: unknown;
    sunset: unknown;
  };
  timezone: unknown;
  id: unknown;
  name: unknown;
  cod: unknown;
}

export interface WeatherData {
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
    },
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
  wind?: {
    speed?: number;
    deg?: number;
    gust?: number;
  };
  clouds: {
    all?: number;
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

export const parseWeatherDataResponse = (props: any): WeatherData => {
  return {
    coord: {
      lon: parseNumber('weatherDataResponse lon', props.coord.lon),
      lat: parseNumber('weatherDataResponse lat', props.coord.lat),
    },
    weather: [
      {
        id: parseNumber('weatherDataResponse id', props.weather[0].id),
        main: parseString('weatherDataResponse main', props.weather[0].main),
        description: parseString(
          'weatherDataResponse description',
          props.weather[0].description,
        ),
        icon: parseString('weatherDataResponse icon', props.weather[0].icon),
      },
    ],
    base: parseString('weatherDataResponse base', props.base),
    main: {
      temp: parseNumber('weatherDataResponse temp', props.main.temp),
      feels_like: parseNumber(
        'weatherDataResponse feels_like',
        props.main.feels_like,
      ),
      temp_min: parseNumber(
        'weatherDataResponse temp_min',
        props.main.temp_min,
      ),
      temp_max: parseNumber(
        'weatherDataResponse temp_max',
        props.main.temp_max,
      ),
      pressure: parseNumber(
        'weatherDataResponse pressure',
        props.main.pressure,
      ),
      humidity: parseNumber(
        'weatherDataResponse humidity',
        props.main.humidity,
      ),
      sea_level: props.main.sea_level
        ? parseNumber('weatherDataResponse sea_level', props.main.sea_level)
        : undefined,
      grnd_level: props.main.grnd_level
        ? parseNumber('weatherDataResponse grnd_level', props.main.grnd_level)
        : undefined,
    },
    visibility: parseNumber('weatherDataResponse visibility', props.visibility),
    wind: {
      speed: props.wind.speed
        ? parseNumber('weatherDataResponse speed', props.wind.speed)
        : undefined,
      deg: props.wind.deg
        ? parseNumber('weatherDataResponse deg', props.wind.deg)
        : undefined,
      gust: props.wind.gust
        ? parseNumber('weatherDataResponse gust', props.wind.gust)
        : undefined,
    },
    clouds: {
      all: parseNumber('weatherDataResponse all', props.clouds.all),
    },
    dt: parseNumber('weatherDataResponse dt', props.dt),
    sys: {
      type: parseNumber('weatherDataResponse type', props.sys.type),
      id: parseNumber('weatherDataResponse id', props.sys.id),
      country: parseString('weatherDataResponse country', props.sys.country),
      sunrise: parseNumber('weatherDataResponse sunrise', props.sys.sunrise),
      sunset: parseNumber('weatherDataResponse sunset', props.sys.sunset),
    },
    timezone: parseNumber('weatherDataResponse timezone', props.timezone),
    id: parseNumber('weatherDataResponse id', props.id),
    name: parseString('weatherDataResponse name', props.name),
    cod: parseNumber('weatherDataResponse cod', props.cod),
  };
};

interface UpdateWeatherDataFields {
  name: unknown;
  lat: unknown;
  lon: unknown;
  state: unknown;
  country: unknown;
  id: unknown;
}

export interface WeatherLocationData {
  name: string;
  lat: number;
  lon: number;
  state: string;
  country: string;
  id: string;
}

export const parseUserUpdateWeatherData = ({
  name,
  lat,
  lon,
  state,
  country,
  id,
}: UpdateWeatherDataFields): WeatherLocationData => {
  return {
    name: parseString('missing or incorrect name', name),
    lat: parseNumber('missing or incorrect lat', lat),
    lon: parseNumber('missing or incorrect lon', lon),
    state: parseString('missing or incorrect state', state),
    country: parseString('missing or incorrect country', country),
    id: parseString('missing or incorrect id', id),
  };
};

export interface ForecastResponseFromApi {
  cod: unknown;
  message: unknown;
  cnt: unknown;
  list: IndividualForecastFromApi[];
  city: {
    id: unknown;
    name: unknown;
    coord: {
      lat: unknown;
      lon: unknown;
    };
    country: unknown;
    population: unknown;
    timezone: unknown;
    sunrise: unknown;
    sunset: unknown;
  };
}

export interface ForecastWeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: IndividualForecastData[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface IndividualForecastFromApi {
  dt: unknown;
  main: {
    temp: unknown;
    feels_like: unknown;
    temp_min: unknown;
    temp_max: unknown;
    pressure: unknown;
    sea_level: unknown;
    grnd_level: unknown;
    humidity: unknown;
    temp_kf: unknown;
  };
  weather: [
    {
      id: unknown;
      main: unknown;
      description: unknown;
      icon: unknown;
    },
  ];
  clouds: {
    all: unknown;
  };
  wind: {
    speed: unknown;
    deg: unknown;
    gust: unknown;
  };
  visibility: unknown;
  pop: unknown;
  sys: {
    pod: unknown;
  };
  dt_txt: unknown;
}

export interface IndividualForecastData {
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

const parseIndividualForecastDay = (
  props: IndividualForecastFromApi,
): IndividualForecastData => {
  return {
    dt: parseNumber('missing or incorrect dt', props.dt),
    main: {
      temp: parseNumber('missing or incorrect temp', props.main.temp),
      feels_like: parseNumber(
        'missing or incorrect feels_like',
        props.main.feels_like,
      ),
      temp_min: parseNumber(
        'missing or incorrect temp_min',
        props.main.temp_min,
      ),
      temp_max: parseNumber(
        'missing or incorrect temp_max',
        props.main.temp_max,
      ),
      pressure: parseNumber(
        'missing or incorrect pressure',
        props.main.pressure,
      ),
      sea_level: parseNumber(
        'missing or incorrect sea_level',
        props.main.sea_level,
      ),
      grnd_level: parseNumber(
        'missing or incorrect grnd_level',
        props.main.grnd_level,
      ),
      humidity: parseNumber(
        'missing or incorrect humidity',
        props.main.humidity,
      ),
      temp_kf: parseNumber('missing or incorrect temp_kf', props.main.temp_kf),
    },
    weather: [
      {
        id: parseNumber('missing or incorrect weather.id', props.weather[0].id),
        main: parseString(
          'missing or incorrect weather.main',
          props.weather[0].main,
        ),
        description: parseString(
          'missing or incorrect weather.description',
          props.weather[0].description,
        ),
        icon: parseString(
          'missing or incorrect weather.icon',
          props.weather[0].icon,
        ),
      },
    ],
    clouds: {
      all: parseNumber('missing or incorrect clouds.all', props.clouds.all),
    },
    wind: {
      speed: parseNumber('missing or incorrect wind.speed', props.wind.speed),
      deg: parseNumber('missing or incorrect wind.deg', props.wind.deg),
      gust: parseNumber('missing or incorrect wind.gust', props.wind.gust),
    },
    visibility: parseNumber(
      'missing or incorrect visibility',
      props.visibility,
    ),
    pop: parseNumber('missing or incorrect pop', props.pop),
    sys: {
      pod: parseString('missing or incorrect sys.pod', props.sys.pod),
    },
    dt_txt: parseString('missing or incorrect dt_txt', props.dt_txt),
  };
};

export const parseForecast = (
  props: ForecastResponseFromApi,
): ForecastWeatherData => {
  return {
    cod: parseString('missing or incorrect cod', props.cod),
    message: parseNumber('missing or incorrect message', props.message),
    cnt: parseNumber('missing or incorrect cnt', props.cnt),
    list: props.list.map(
      (listItem: IndividualForecastFromApi): IndividualForecastData =>
        parseIndividualForecastDay(listItem),
    ),
    city: {
      id: parseNumber('missing or incorrect city.id', props.city.id),
      name: parseString('missing or incorrect city.name', props.city.name),
      coord: {
        lat: parseNumber('missing or incorrect lat', props.city.coord.lat),
        lon: parseNumber('missing or incorrect lon', props.city.coord.lon),
      },
      country: parseString('missing or incorrect country', props.city.country),
      population: parseNumber(
        'missing or incorrect population',
        props.city.population,
      ),
      timezone: parseNumber(
        'missing or incorrect timezone',
        props.city.timezone,
      ),
      sunrise: parseNumber('missing or incorrect sunrise', props.city.sunrise),
      sunset: parseNumber('missing or incorrect sunset', props.city.sunset),
    },
  };
};

export function mostFrequentElemenInArray<Type>(arr: Type[]) {
  const n = arr.length;
  let maxcount = 0;
  let element_having_max_freq;

  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (arr[i] == arr[j]) count++;
    }

    if (count > maxcount) {
      maxcount = count;
      element_having_max_freq = arr[i];
    }
  }

  return element_having_max_freq;
}

export const findMostFrequent = (
  arr: IndividualForecastData['weather'][],
): IndividualForecastData['weather'][0] => {
  const tempArr: number[] = [];
  const flattenedArr = arr.flat();

  for (let i = 0; i < flattenedArr.length; i++) {
    tempArr.push(
      parseNumber('missing or incorrect number', flattenedArr[i].id),
    );
  }

  const id = mostFrequentElemenInArray(tempArr);
  const returnWeather = flattenedArr.find((item) => item.id === id);
  if (!returnWeather) throw new Error('missing weather object');

  return returnWeather;
};
