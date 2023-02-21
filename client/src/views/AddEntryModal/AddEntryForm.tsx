import React from 'react';

// Material ui
import { Grid, Button } from '@material-ui/core';

// Form Components / Formik
import { Field, Formik, Form } from 'formik';
import { TextField } from '../AddPatientModal/FormField';
import { DiagnosisSelection } from '../AddPatientModal/FormField';

// Utils
import { parseDate } from '../../utils/utils';

// Redux
import { useSelector } from 'react-redux';

// Types
import { Diagnosis } from '../../types';
import { RootState } from '../../store';

export type EntryFormValues = {
  date: string;
  description: string;
  specialist: string;
  dischargeDate: string;
  dischargeCriteria: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const { diagnoses } = useSelector((state: RootState) => state);
  
  return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        dischargeDate: '',
        dischargeCriteria: '',
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};

        if (!values.date) {
          errors.date = requiredError;
        } else if (!parseDate('date', values.date)) {
          errors.date = 'Malformatted date required: YYYY-MM-DD';
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.dischargeDate) {
          errors.discharge = requiredError;
        } else if (!parseDate('date', values.dischargeDate)) {
          errors.dischargeDate =
            'Malformatted date required format: YYYY-MM-DD';
        }
        if (!values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="dischargeDate"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="criteria"
              placeholder="criteria"
              name="dischargeCriteria"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={
                    !dirty || !isValid || !setFieldTouched || !setFieldValue
                  }
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
