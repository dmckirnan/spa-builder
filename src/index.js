import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer.js';

const store = configureStore();
/* eslint-disable no-undef */
render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AppContainer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
