"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const patient_1 = __importDefault(require("../models/patient"));
const patientData = patients_1.default;
const findPatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield patient_1.default.findById(id);
    }
    catch (error) {
        const message = `Error retrieving patient from database: ${error}`;
        throw new Error(message);
    }
});
const addNewPatient = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = new patient_1.default({
        name: entry.name,
        dateOfBirth: entry.dateOfBirth,
        ssn: entry.ssn,
        gender: entry.gender,
        occupation: entry.occupation,
        entries: entry.entries
    });
    const response = yield patient.save();
    return response;
});
const getNonSensitivePatientEntries = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = patient_1.default.find({}, { 'ssn': 0 });
    return response;
});
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
const addNewEntry = (id, entry) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPatient = yield patient_1.default.findByIdAndUpdate(id, { $push: { entries: entry } }, { new: true });
        return updatedPatient;
    }
    catch (error) {
        const message = `Error retrieving patient from database: ${error}`;
        throw new Error(message);
    }
    const person = patientData.find((person) => person.id === id);
    if (person === undefined) {
        throw new Error('Person Not Found');
    }
});
exports.default = {
    getPatientEntries,
    getNonSensitivePatientEntries,
    addNewPatient,
    findPatient,
    addNewEntry,
};
