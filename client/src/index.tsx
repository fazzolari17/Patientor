import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider as StateProvider } from 'react-redux';
import store from './store';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Router from './router/CustomRouter';
import history from './router/history';

const theme = createTheme();

ReactDOM.render(
  <StateProvider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <App />
      </Router>
    </ThemeProvider>
  </StateProvider>,
  document.getElementById('root')
);
