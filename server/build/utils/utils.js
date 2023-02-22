"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNever = exports.isString = exports.parseString = void 0;
const types_1 = require("../types");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !(0, exports.isString)(gender) || !isGender(gender)) {
        throw new Error(`Missing Gender`);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !(0, exports.isString)(occupation)) {
        throw new Error(`Missing occupation`);
    }
    return occupation;
};
const parseSsn = (ssn) => {
    if (!ssn || !(0, exports.isString)(ssn)) {
        throw new Error(`SSN is missing or is incorrect`);
    }
    return ssn;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (description, date) => {
    if (!date || !(0, exports.isString)(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing ${description}: ${date}`);
    }
    return (new Date(date).toISOString().split('T')[0]);
};
const parseString = (description, text) => {
    if (!text || !(0, exports.isString)(text)) {
        throw new Error(`Incorrect or missing ${description}`);
    }
    return text;
};
exports.parseString = parseString;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
// type FieldsFromDB = {
//   _id: unknown
//   name: unknown;
//   dateOfBirth: unknown;
//   ssn: unknown;
//   occupation: unknown;
//   gender: unknown;
// };
// const fromDatabase = ({
// })
const toNewPatientEntry = ({ name, dateOfBirth, ssn, occupation, gender, }) => {
    const newEntry = {
        name: (0, exports.parseString)('name', name),
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
        if (!(0, exports.isString)(code)) {
            throw new Error('Code needs to be an Array of stings');
        }
        codes.push(code);
    });
    return codes;
};
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member : ${JSON.stringify(value)}`);
};
exports.assertNever = assertNever;
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
                specialist: (0, exports.parseString)('specialist', entry.specialist),
                description: (0, exports.parseString)('description', entry.description),
                diagnosisCodes: diagnoses,
                discharge: {
                    date: parseDate('Hospital Discharge date', entry.discharge.date),
                    criteria: (0, exports.parseString)('criteria', entry.discharge.criteria),
                },
            };
            // return newEntry;
            break;
        case 'OccupationalHealthcare':
            return {
                date: parseDate('Occupational Date', entry.date),
                type: 'OccupationalHealthcare',
                specialist: (0, exports.parseString)('specialist', entry.specialist),
                description: (0, exports.parseString)('description', entry.description),
                diagnosisCodes: diagnoses,
                employerName: (0, exports.parseString)('employer name', entry.employerName),
            };
            break;
        case 'HealthCheck':
            return {
                date: parseDate('HealthCheck Date', entry.date),
                type: 'HealthCheck',
                specialist: (0, exports.parseString)('specialist', entry.specialist),
                description: (0, exports.parseString)('description', entry.description),
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
