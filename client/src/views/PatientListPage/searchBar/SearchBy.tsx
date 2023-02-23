import * as React from 'react';
import {  MenuItem } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  setSearchFilterValue: React.Dispatch<React.SetStateAction<string>>
  searchFilterValue: string
}
const SearchBy = ({ searchFilterValue, setSearchFilterValue }: Props) => {
  

  const handleChange = (event: SelectChangeEvent) => {
    setSearchFilterValue(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-helper-label">Search By</InputLabel>
        <Select
          labelId="select-helper-label"
          id="select-helper-label"
          value={searchFilterValue}
          label="Search By"
          onChange={handleChange}
        >
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'occupation'}>Occupation</MenuItem>
        </Select>
      </FormControl>
    
    </div>
  );
}

export default SearchBy;