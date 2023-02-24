import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

const names = ['Ascending', 'Decending'];

interface Props {
  sortPatientList: string;
  setSortPatientList: React.Dispatch<React.SetStateAction<string>>;
}
const SortPatientList = ({ sortPatientList, setSortPatientList }: Props) => {
  const handleChange = (event: SelectChangeEvent<typeof sortPatientList>) => {
    const {
      target: { value },
    } = event;
    setSortPatientList(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="sort-patient-list">Sort List</InputLabel>
        <Select
          labelId="sort-patient-list"
          id="sort-patient-select"
          value={sortPatientList}
          onChange={handleChange}
          input={<OutlinedInput label="Sort List" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SortPatientList;
