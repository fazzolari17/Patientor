import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField } from "../AddPatientModal/FormField";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";
import { parseDate } from "../utils";
import { SelectField } from "../AddPatientModal/FormField";

export type EntryFormValues = {
  type: "HealthCheck";
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  healthCheckRating: number;
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
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        healthCheckRating: 0,
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
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
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
            <SelectField
              name="healthCheckRating"
              label="Health Check Rating"
              options={[
                { value: 0, label: "Healthy" },
                { value: 1, label: "Low Risk" },
                { value: 2, label: "High Risk" },
                { value: 3, label: "Critical Risk" },
              ]}
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
