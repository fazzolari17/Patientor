import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";

import PatientPage from "./PatientPage";
import { setPatientList, setDiagnoses } from "./state";

import PersistentDrawerLeft from "./PersistentDrawer";
import SignUp from "./SignUp/SignUp";
import LoginPage from "./LoginPage/index";
import HomePage from "./Home/HomePage";

const App = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiagnosis = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnoses));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatientList();
    void fetchDiagnosis();
  }, [dispatch]);

  return (
    <Router>
      <PersistentDrawerLeft>
        <div className="App">
          <Container>
            {/* <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
              Patientor
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button> */}
            <Divider hidden />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/patients" element={<PatientListPage />} />
              <Route path="/sign%20up" element={<SignUp />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/:id" element={<PatientPage />} />
            </Routes>
          </Container>
        </div>
      </PersistentDrawerLeft>
    </Router>
  );
};

export default App;
