import { Diagnosis, Entry, Gender, Patient } from '../types/types';
import {
  LocationData,
  IndividualHourlyForecast,
  HourlyWeatherForecast,
} from '../types/weather';
import {
  IndividualForecastFromApi,
  ForecastResponseFromApi,
} from '../types/apiResponses';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member : ${JSON.stringify(value)}`
  );
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (description: string, text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${description}`);
  }

  return text;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

export const parseNumber = (description: string, number: unknown): number => {
  if (!number || !isNumber(number)) {
    throw new Error(`Incorrect or missing ${description}`);
  }

  return number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    id: parseString('missing or incorrect patient data id', id),
    name: parseString('missing or incorrect patient data name', name),
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
    id: parseString('missing or incorrect data received from mongo id', id),
    name: parseString(
      'missing or incorrect data received from mongo name',
      name
    ),
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

export interface LocationDataFromApi {
  name: unknown;
  state: unknown;
  country: unknown;
  lat: unknown;
  lon: unknown;
  id: unknown;
}

export const parseLocationData = ({
  name,
  state,
  country,
  lat,
  lon,
  id,
}: LocationDataFromApi): LocationData => {
  return {
    name: parseString('missing or incorrect location data from api name', name),
    state: parseString(
      'missing or incorrect location data from api state',
      state
    ),
    country: parseString(
      'missing or incorrect location data from api country',
      country
    ),
    lat: parseNumber('missing or incorect location data from api lat', lat),
    lon: parseNumber('missing or incorect location data from api lon', lon),
    id: parseString('missing or incorrect location data from api id', id),
  };
};

export const timeSinceLastWeatherUpdate = () => {
  const weatherFromStorage = localStorage.getItem('weather');
  const elevenMinutes = 660000;
  if (!weatherFromStorage) {
    return elevenMinutes;
  }
  const weather = JSON.parse(weatherFromStorage);

  const dataDownloadTime = weather.timestamp;

  const currentTime = Date.now();
  const elapsedTime = currentTime - dataDownloadTime;

  return elapsedTime;
};

const parseIndividualForecastDay = (
  props: IndividualForecastFromApi
): IndividualHourlyForecast => {
  return {
    dt: parseNumber('missing or incorrect dt', props.dt),
    main: {
      temp: parseNumber('missing or incorrect temp', props.main.temp),
      feels_like: parseNumber(
        'missing or incorrect feels_like',
        props.main.feels_like
      ),
      temp_min: parseNumber(
        'missing or incorrect temp_min',
        props.main.temp_min
      ),
      temp_max: parseNumber(
        'missing or incorrect temp_max',
        props.main.temp_max
      ),
      pressure: parseNumber(
        'missing or incorrect pressure',
        props.main.pressure
      ),
      sea_level: parseNumber(
        'missing or incorrect sea_level',
        props.main.sea_level
      ),
      grnd_level: parseNumber(
        'missing or incorrect grnd_level',
        props.main.grnd_level
      ),
      humidity: parseNumber(
        'missing or incorrect humidity',
        props.main.humidity
      ),
      temp_kf: parseNumber('missing or incorrect temp_kf', props.main.temp_kf),
    },
    weather: [
      {
        id: parseNumber('missing or incorrect weather.id', props.weather[0].id),
        main: parseString(
          'missing or incorrect weather.main',
          props.weather[0].main
        ),
        description: parseString(
          'missing or incorrect weather.description',
          props.weather[0].description
        ),
        icon: parseString(
          'missing or incorrect weather.icon',
          props.weather[0].icon
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
      props.visibility
    ),
    pop: parseNumber('missing or incorrect pop', props.pop),
    sys: {
      pod: parseString('missing or incorrect sys.pod', props.sys.pod),
    },
    dt_txt: parseString('missing or incorrect dt_txt', props.dt_txt),
  };
};

export const parseForecast = (
  props: ForecastResponseFromApi
): HourlyWeatherForecast => {
  return {
    timestamp: parseNumber('missing or in correct timestamp', props.timestamp),
    cod: parseString('missing or incorrect cod', props.cod),
    message: parseNumber('missing or incorrect message', props.message),
    cnt: parseNumber('missing or incorrect cnt', props.cnt),
    list: props.list.map(
      (listItem: IndividualForecastFromApi): IndividualHourlyForecast =>
        parseIndividualForecastDay(listItem)
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
        props.city.population
      ),
      timezone: parseNumber(
        'missing or incorrect timezone',
        props.city.timezone
      ),
      sunrise: parseNumber('missing or incorrect sunrise', props.city.sunrise),
      sunset: parseNumber('missing or incorrect sunset', props.city.sunset),
    },
  };
};

export const windDirection = (degrees: number) => {
  if (degrees > 337.5 || degrees < 22.5) {
    return 'N';
  } else if (degrees > 22.5 && degrees < 67.5) {
    return 'NE';
  } else if (degrees > 67.5 && degrees < 112.5) {
    return 'E';
  } else if (degrees > 112.5 && degrees < 157.5) {
    return 'SE';
  } else if (degrees > 157.5 && degrees < 202.5) {
    return 'S';
  } else if (degrees > 202.5 && degrees < 247.5) {
    return 'SW';
  } else if (degrees > 247.5 && degrees < 292.5) {
    return 'W';
  } else if (degrees > 292.5 && degrees < 337.5) {
    return 'NW';
  }
};
