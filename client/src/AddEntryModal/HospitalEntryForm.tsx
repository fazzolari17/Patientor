import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField } from "../AddPatientModal/FormField";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";
// import { EntryFormValues } from '../types';
import { parseDate } from "../utils/utils";

export type EntryFormValues = {
  type: "Hospital";
  date: string;
  description: string;
  specialist: string;
  dischargeDate: string;
  dischargeCriteria: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const HospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        dischargeDate: "",
        dischargeCriteria: "",
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};

        if (!values.date) {
          errors.date = requiredError;
        } else if (!parseDate(values.date)) {
          errors.date = "Malformatted date required: YYYY-MM-DD";
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.dischargeDate) {
          errors.discharge = requiredError;
        } else if (!parseDate(values.dischargeDate)) {
          errors.dischargeDate =
            "Malformatted date required format: YYYY-MM-DD";
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
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
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

export default HospitalEntryForm;
