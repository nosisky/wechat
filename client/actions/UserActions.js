import axios from 'axios';
import jwt from 'jsonwebtoken';
import $ from 'jquery';

import setAuthorizationToken from '../utils/setAuthorizationToken';

import { SET_API_STATUS, SET_CURRENT_USER, UNAUTH_USER } from './ActionTypes';

const userApiUrl = '/api/v1/users/';

/**
 * @description -  Sets API status
 *
 * @export { Function } - Set API Progress
 *
 * @param { Boolean } status - User object
 *
 * @returns {  Object } - Action
 */
export function setApiCallProgress(status) {
  return {
    type: SET_API_STATUS,
    apiStatus: status
  };
}

/**
 * @description - Set current user
 *
 * @param {Object} currentUser - Decoded JWT Token
 *
 * @returns {Object} - redux action to be dispatched
 */
export function setCurrentUser(currentUser) {
  return {
    type: SET_CURRENT_USER,
    user: currentUser,
    authenticated: true
  };
}

/** @description - Login action
 *
 * @param {Object} userData - Object containing user details
 *
 * @returns { Object } - Dispatches user object to the store
 */
export function loginAction(userData) {
  setApiCallProgress(true);
  return dispatch =>
    axios
      .post(`${userApiUrl}/signin`, userData)
      .then((response) => {
        setApiCallProgress(true);
        const { token } = response.data;
        localStorage.setItem('token', token);
        setAuthorizationToken(token);
        const decoded = jwt.decode(response.data.token);
        dispatch(setCurrentUser(decoded.currentUser));
        Materialize.toast(response.data.message, '3000');
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, '2000', 'red');
      });
}

/**
 *
 * @description - Register user action
 *
 * @param {Object} userData - Object containing user details
 *
 * @returns { Object } - Dispatches user object to the store
 */
export function registerAction(userData) {
  return dispatch =>
    axios
      .post(`${userApiUrl}/signup`, userData)
      .then((response) => {
        setApiCallProgress(true);
        const { token } = response.data;
        localStorage.setItem('token', token);
        setAuthorizationToken(token);
        const decoded = jwt.decode(response.data.token);
        dispatch(setCurrentUser(decoded.currentUser));
      })
      .catch((error) => {
        console.log(error);
      });
}

/**
 * @description - Unauthenticates a user
 *
 * @returns { Object } - Dispatches user object to the store
 */
export const logoutAction = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
  dispatch({
    type: UNAUTH_USER,
    user: {},
    authenticated: false
  });
  Materialize.toast('Sucessfully logged out...', 1000, 'red');
};
