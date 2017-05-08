import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import pomodoroApp from './reducers/reducers';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import './index.css';

// Create the redux store
let store = createStore(pomodoroApp);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
