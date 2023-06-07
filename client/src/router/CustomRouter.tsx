import React, { useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import { History } from 'history';

interface Props {
  history: History;
  children: React.ReactElement;
}

const CustomRouter = ({ history, children, ...props }: Props) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};

export default CustomRouter;
