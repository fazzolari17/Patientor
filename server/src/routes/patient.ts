import express from 'express';
import { RequestHandler } from 'express';
import patientService from '../services/patientService';
import { AddNewPatient, NewEntry } from '../types';
import utils from '../utils/utils';

const patientRouter = express.Router();

patientRouter.get('/:id', (async (req, res) => {
  try {
    res.status(200).send(await patientService.findPatient(req.params.id));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
}) as RequestHandler);

patientRouter.get('/', (async (_req, res) => {
  try {
    res.status(200).send(await patientService.getNonSensitivePatientEntries());
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
}) as RequestHandler);

patientRouter.put('/:id/entries', (async (req, res): Promise<void> => {
  const body: NewEntry = req.body as NewEntry;
  const id: string = req.params.id;

  try {
    const newEntry: NewEntry = utils.toNewEntry(body);
    const updatedPatient = await patientService.addNewEntry(id, newEntry);
    res.status(200).send(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
}) as RequestHandler);

patientRouter.post('/', (async (req, res): Promise<void> => {
  const body: AddNewPatient = req.body as AddNewPatient;

  try {
    const newPatientEntry = utils.toNewPatientEntry(body);
    res.status(200).send(await patientService.addNewPatient(newPatientEntry));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
}) as RequestHandler);

export default patientRouter;
