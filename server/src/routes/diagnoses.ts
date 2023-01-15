import express from 'express';
import diagnosesService from '../services/diagnosesService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  console.log('Diagnoses Page');
  res.send(diagnosesService.getDiagnoses());
});

export default diagnosesRouter;
