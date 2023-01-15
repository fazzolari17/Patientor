"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Missing Gender`);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Missing occupation`);
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`SSN is missing or is incorrect`);
    }
    return ssn;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (description, date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${description}: ${date}`);
    }
    return date;
};
const parseString = (description, text) => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${description}`);
    }
    return text;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const toNewPatientEntry = ({ name, dateOfBirth, ssn, occupation, gender, }) => {
    const newEntry = {
        name: parseString('name', name),
        dateOfBirth: parseDate('Date of Birth', dateOfBirth),
        ssn: parseSsn(ssn),
        occupation: parseOccupation(occupation),
        gender: parseGender(gender),
        entries: [],
    };
    return newEntry;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || typeof healthCheckRating !== 'number') {
        throw new Error('healthCheckRating is missing or incorrect');
    }
    return healthCheckRating;
};
const parseDiagnoses = (diagnoses) => {
    const codes = [];
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
const toNewEntry = (entry) => {
    let newEntry;
    const diagnoses = !entry.diagnosesCodes
        ? []
        : parseDiagnoses(entry.diagnosesCodes);
    const assertNever = (value) => {
        throw new Error(`Unhandled discriminated union member : ${JSON.stringify(value)}`);
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
            return newEntry;
            break;
        case 'OccupationalHealthcare':
            newEntry = {
                date: parseDate('Occupational Date', entry.date),
                type: 'OccupationalHealthcare',
                specialist: parseString('specialist', entry.specialist),
                description: parseString('description', entry.description),
                diagnosisCodes: diagnoses,
                employerName: parseString('employer name', entry.employerName),
            };
            return newEntry;
            break;
        case 'HealthCheck':
            newEntry = {
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
exports.default = {
    toNewPatientEntry,
    toNewEntry,
};
