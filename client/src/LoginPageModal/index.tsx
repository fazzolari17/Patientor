import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  // onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const LoginPageModal = ({ modalOpen, onClose, error }: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        {/* <AddPatientForm onSubmit={onSubmit} onCancel={onClose} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default LoginPageModal;
