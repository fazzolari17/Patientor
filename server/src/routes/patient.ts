import express from 'express';
import patientService from '../services/patientService';
import { AddNewPatient, NewEntry } from '../types';
import utils from '../utils';

const patientRouter = express.Router();

patientRouter.get('/:id', (req, res) => {
  res.send(patientService.findPatient(req.params.id));
});

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

patientRouter.post('/:id/entries', (req, res) => {
  const body: NewEntry = req.body as NewEntry;
  const id: string = req.params.id;
  try {
    const newEntry: NewEntry = utils.toNewEntry(body);
    const updatedPatient = patientService.addNewEntry(id, newEntry);
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientRouter.post('/', (req, res) => {
  const body: AddNewPatient = req.body as AddNewPatient;
  try {
    const newPatientEntry = utils.toNewPatientEntry(body);
    const addedEntry = patientService.addNewPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
