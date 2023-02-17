import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { capitalized } from '../utils/helperFunctions';

interface Props {
  disabled?: boolean;
  navigateTo: string;
}
const MenuItem = ({ navigateTo, disabled }: Props) => {
  const navigate = useNavigate();

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => navigate(`/${navigateTo}`)}
        disabled={disabled}
      >
        <ListItemIcon>
          {/* Find Icons to Put Here and Pass through as Props */}
          {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
        </ListItemIcon>
        <ListItemText primary={capitalized(navigateTo)} />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
