"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const patientRouter = express_1.default.Router();
patientRouter.get('/:id', (req, res) => {
    res.send(patientService_1.default.findPatient(req.params.id));
});
patientRouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientEntries());
});
patientRouter.post('/:id/entries', (req, res) => {
    const body = req.body;
    const id = req.params.id;
    try {
        const newEntry = utils_1.default.toNewEntry(body);
        const updatedPatient = patientService_1.default.addNewEntry(id, newEntry);
        res.json(updatedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
patientRouter.post('/', (req, res) => {
    const body = req.body;
    try {
        const newPatientEntry = utils_1.default.toNewPatientEntry(body);
        const addedEntry = patientService_1.default.addNewPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = patientRouter;
