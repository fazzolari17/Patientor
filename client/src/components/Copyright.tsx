import React from 'react';
import { Link, Typography } from '@material-ui/core';

const Copyright = (_props: unknown) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {/* {'Copyright © '} */}
      <Link color="inherit" href="https://www.giuseppefazzolari.com/">
        Created by: Giuseppe Fazzolari
      </Link>{' '}
      {2023}
      {'.'}
    </Typography>
  );
};

export default Copyright;
