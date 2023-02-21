import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider as StateProvider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <StateProvider store={store}>
    <Router>
      <App />
    </Router>
  </StateProvider>,
  document.getElementById('root')
);
