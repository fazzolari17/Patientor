import entrySchema from './entry';

import mongoose

from 'mongoose';
import { PatientEntry } from '../types';

const patientSchema = new mongoose.Schema<PatientEntry>({
  name: String,
  dateOfBirth: String,
  ssn: String,
  gender: String,
  occupation: String,
  entries: [
    entrySchema.hospitalEntry,
    entrySchema.healthCheckEntry,
    entrySchema.occupationalHealthcare
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

const Patient = mongoose.model<PatientEntry>('Patient', patientSchema);

export default Patient;
