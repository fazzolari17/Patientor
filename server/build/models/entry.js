"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const baseEntrySchema = new mongoose_1.default.Schema({
    id: String,
    description: String,
    date: String,
    specialist: String,
    diagnosisCodes: [String],
    sickLeave: {
        startDate: String,
        endDate: String,
    },
});
baseEntrySchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});
const hospitalEntry = new mongoose_1.default.Schema({
    type: {
        type: String,
        value: 'Hospital',
        required: [true, 'Must have a type field'],
    },
    discharge: {
        date: {
            type: String,
            required: [true, 'Hospital entry discharge must have a date'],
        },
        criteria: {
            type: String,
            required: [true, 'Hospital Entry must have a critera'],
        },
    },
});
const occupationalHealthcare = new mongoose_1.default.Schema({
    type: {
        type: String,
        value: 'OccupationalHealthcare',
        required: [true, 'Must have a type field'],
    },
    employerName: String,
    sickLeave: {
        startDate: String,
        endDate: String,
    },
});
const healthCheckEntry = new mongoose_1.default.Schema({
    type: {
        type: String,
        value: 'HealthCheck',
        required: [true, 'Must have a type field'],
    },
    healthCheckRating: {
        type: Number,
        enum: [0, 1, 2, 3],
        required: [true, 'Must have a healthCheckrating'],
    },
});
hospitalEntry.add(baseEntrySchema);
occupationalHealthcare.add(baseEntrySchema);
healthCheckEntry.add(baseEntrySchema);
exports.default = {
    hospitalEntry,
    occupationalHealthcare,
    healthCheckEntry,
};
