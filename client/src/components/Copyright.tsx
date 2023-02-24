import React from 'react';
import { Link, Typography } from '@material-ui/core';

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.giuseppefazzolari.com/">
        Created by: Giuseppe Fazzolari
      </Link>{' '}
      {2023}
      {'.'}
    </Typography>
  );
};

export default Copyright;
