import React from 'react';
import { useNavigate } from 'react-router-dom';

// Types
import { FC } from 'react';

// Material ui
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Utils
import { capitalized } from '../utils/helperFunctions';

interface Props {
  disabled?: boolean;
  handleClick: () => void;
  label: string;
}
const MenuItem = ({ label, handleClick, disabled }: Props) => {
  const navigate = useNavigate();

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick} disabled={disabled}>
        <ListItemIcon>
          {/* Find Icons to Put Here and Pass through as Props */}
          {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
        </ListItemIcon>
        <ListItemText primary={capitalized(label)} />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
