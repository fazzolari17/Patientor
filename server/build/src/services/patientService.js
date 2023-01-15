"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
let patientData = patients_1.default;
const findPatient = (id) => {
    const patientFound = patients_1.default.find((patient) => patient.id === id);
    return Object.assign({}, patientFound);
};
const addNewPatient = (entry) => {
    const newPatientEntry = Object.assign(Object.assign({ id: (0, uuid_1.v1)() }, entry), { entries: [] });
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const getNonSensitivePatientEntries = () => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const getPatientEntries = () => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
        ssn,
    }));
};
const addNewEntry = (id, entry) => {
    const person = patientData.find((person) => person.id === id);
    if (person === undefined) {
        throw new Error('Person Not Found');
    }
    const assertNever = (value) => {
        throw new Error(`Unhandled discriminated union member : ${JSON.stringify(value)}`);
    };
    let updatedPerson;
    let newEntry;
    switch (entry.type) {
        case 'Hospital':
            newEntry = {
                id: (0, uuid_1.v1)(),
                date: entry.date,
                specialist: entry.specialist,
                type: entry.type,
                description: entry.description,
                diagnosisCodes: entry.diagnosisCodes,
                discharge: entry.discharge,
            };
            updatedPerson = Object.assign(Object.assign({}, person), { entries: [...person.entries, Object.assign({}, newEntry)] });
            patientData = patientData.map((patient) => patient.id === id ? updatedPerson : patient);
            return newEntry;
            break;
        case 'HealthCheck':
            newEntry = {
                id: (0, uuid_1.v1)(),
                date: entry.date,
                specialist: entry.specialist,
                type: entry.type,
                description: entry.description,
                healthCheckRating: entry.healthCheckRating,
            };
            updatedPerson = Object.assign(Object.assign({}, person), { entries: [...person.entries, Object.assign({}, newEntry)] });
            patientData = patientData.map((patient) => patient.id === id ? updatedPerson : patient);
            return newEntry;
            break;
        case 'OccupationalHealthcare':
            newEntry = {
                id: (0, uuid_1.v1)(),
                date: entry.date,
                specialist: entry.specialist,
                type: 'OccupationalHealthcare',
                description: entry.description,
                employerName: entry.employerName,
            };
            updatedPerson = Object.assign(Object.assign({}, person), { entries: [...person.entries, Object.assign({}, newEntry)] });
            patientData = patientData.map((patient) => patient.id === id ? updatedPerson : patient);
            return newEntry;
            break;
        default:
            return assertNever(entry);
    }
};
exports.default = {
    getPatientEntries,
    getNonSensitivePatientEntries,
    addNewPatient,
    findPatient,
    addNewEntry,
};
