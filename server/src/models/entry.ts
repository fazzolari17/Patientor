import mongoose from 'mongoose';
import { MongoBaseEntry, Entry } from '../types';


const baseEntrySchema = new mongoose.Schema<MongoBaseEntry>({
  id: String,
  description: String,
  date: String,
  specialist: String,
  diagnosisCodes: [String],
  sickLeave: {
    startDate: String,
    endDate: String
  }
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

const hospitalEntry = new mongoose.Schema<Entry>({
  type: {
    type: String,
    value: 'Hospital',
    required: [true, 'Must have a type field']
  },
  discharge: {
    date: {
      type: String,
      required: [true, 'Hospital entry discharge must have a date']
    },
    criteria: {
      type: String,
      required: [true, 'Hospital Entry must have a critera']
    }
  }
});

const occupationalHealthcare = new mongoose.Schema<Entry>({
  type: {
    type: String,
    value: 'OccupationalHealthcare',
    required: [true, 'Must have a type field']
  },
  employerName: String,
  sickLeave: {
    startDate: String,
    endDate: String
  }
});

const healthCheckEntry = new mongoose.Schema<Entry>({
  type: {
    type: String,
    value: 'HealthCheck',
    required: [true, 'Must have a type field']
  },
  healthCheckRating: {
    type: Number,
    enum: [0, 1, 2, 3],
    required: [true, 'Must have a healthCheckrating']
  }
});

hospitalEntry.add(baseEntrySchema);
occupationalHealthcare.add(baseEntrySchema);
healthCheckEntry.add(baseEntrySchema);



export default {
  hospitalEntry,
  occupationalHealthcare,
  healthCheckEntry
};
