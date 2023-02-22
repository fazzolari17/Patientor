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
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils/utils"));
const patientRouter = express_1.default.Router();
patientRouter.get('/:id', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send(yield patientService_1.default.findPatient(req.params.id));
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})));
patientRouter.get('/', ((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send(yield patientService_1.default.getNonSensitivePatientEntries());
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})));
patientRouter.put('/:id/entries', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = req.params.id;
    try {
        const newEntry = utils_1.default.toNewEntry(body);
        const updatedPatient = yield patientService_1.default.addNewEntry(id, newEntry);
        res.status(200).send(updatedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})));
patientRouter.post('/', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newPatientEntry = utils_1.default.toNewPatientEntry(body);
        res.status(200).send(yield patientService_1.default.addNewPatient(newPatientEntry));
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})));
exports.default = patientRouter;
