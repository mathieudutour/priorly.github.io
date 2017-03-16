/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { fetchToken } from './reducers/user';

// Load offline plugin only on production
process.env.NODE_ENV === 'production' && require('./offline');

store.dispatch(fetchToken());

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);