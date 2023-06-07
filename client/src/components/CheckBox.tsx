import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';

interface Props {
  label: string;
  labelSize?: string;
  isChecked?: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkbox = ({ label, labelSize = '1rem', setIsChecked }: Props) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MuiCheckbox
            defaultChecked
            onClick={() => setIsChecked((prevState) => !prevState)}
          />
        }
        label={<span style={{ fontSize: labelSize }}>{label}</span>}
      />
    </FormGroup>
  );
};

export default Checkbox;
