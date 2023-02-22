"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entry_1 = __importDefault(require("./entry"));
const mongoose_1 = __importDefault(require("mongoose"));
const patientSchema = new mongoose_1.default.Schema({
    name: String,
    dateOfBirth: String,
    ssn: String,
    gender: String,
    occupation: String,
    entries: [
        entry_1.default.hospitalEntry,
        entry_1.default.healthCheckEntry,
        entry_1.default.occupationalHealthcare,
    ],
});
patientSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const Patient = mongoose_1.default.model('Patient', patientSchema);
exports.default = Patient;
