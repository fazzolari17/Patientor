import express from 'express';
import cors from 'cors';

import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patient';

const app = express();
const PORT = 3001;

app.use(express.static('front'));
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log(`Someone Pinged Here`);
  res.status(200).send('pong');
});

app.get('/api/health', (_req, res) => {
  res.status(200).send('200 ok');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
