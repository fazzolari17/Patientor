import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider as StateProvider } from 'react-redux';
import store from './store';
import { createTheme, ThemeProvider } from '@material-ui/core';
const theme = createTheme();

ReactDOM.render(
  <StateProvider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StateProvider>,
  document.getElementById('root')
);
