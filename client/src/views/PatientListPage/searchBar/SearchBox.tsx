import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox = ({ searchValue, setSearchValue }: Props) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Search"
        variant="outlined"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </Box>
  );
};

export default SearchBox;
