import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { NEW_MESSAGE } from './actions/ActionTypes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser, logoutAction } from './actions/UserActions';

import App from './components/App';
import configureStore from './store/configureStore';
const socket = io.connect('/');


const store = configureStore();

const token = localStorage.getItem('token');


socket.on('message received', (data) => {
  const userData = jwt.decode(token).currentUser;

  if (data.receiverId === userData.id) {
    $("#new-indicator").show().delay(5000).fadeOut();
  }
  store.dispatch({
    type: NEW_MESSAGE,
    message: data
  })
})


if (token) {
  if (!jwt.decode(token)) {
    store.dispatch(logoutAction());
    window.location = '/';
  } else {
    setAuthorizationToken(token);
    store.dispatch(setCurrentUser(jwt.decode(token).currentUser));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
