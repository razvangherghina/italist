import React from 'react';
import {Provider} from 'react-redux';
import store from '../store';
import router from '../router';


const Main = () => (
  <Provider store={store}>
    {router}
  </Provider>
);

export default Main;