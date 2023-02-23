import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Male',
  'Female',
  'Other',
];


interface Props {
  genderFilterValue: string[],
  setGenderFilterValue: React.Dispatch<React.SetStateAction<string[]>>
}
const GenderSelector = ({ genderFilterValue, setGenderFilterValue }: Props) => {

  const handleChange = (event: SelectChangeEvent<typeof genderFilterValue>) => {
    const {
      target: { value },
    } = event;
    setGenderFilterValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="checkbox-label">Gender</InputLabel>
        <Select
          labelId="checkbox-label"
          id="multiple-checkbox"
          multiple
          value={genderFilterValue}
          onChange={handleChange}
          input={<OutlinedInput label="Gender" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((gender) => (
            <MenuItem key={gender} value={gender}>
              <Checkbox checked={genderFilterValue.indexOf(gender) > -1} />
              <ListItemText primary={gender} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default GenderSelector;