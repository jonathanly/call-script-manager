import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Axios baseURL config
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
