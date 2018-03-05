import axios from 'axios';

import setAuthorizationToken from '../utils/setAuthorizationToken';

import { GET_CHAT_HISTORY, SET_API_STATUS } from './ActionTypes';

const userApiUrl = '/api/v1/chat';


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


/** @description - Get chat history
 *
 * @param {Number} UserId - Object containing user details
 *
 * @returns { Object } - Dispatches user object to the store
 */
export function getChatHistory(receiverId) {
  setApiCallProgress(true);
  return dispatch =>
    axios
      .get(`${userApiUrl}/${receiverId}`)
      .then((response) => {
        dispatch(setApiCallProgress(true));
        dispatch({
          type: GET_CHAT_HISTORY,
          message: response.data
        });
        return true;
      })
      .catch((error) => {
        toastr.error(error.response.data.message);
      });
}
