import {
  GET_CHAT_HISTORY
} from '../actions/ActionTypes';

const initialState = {
  messages: [],
};

/**
 * @description - User authentication reducer
 *
 * @param {Object} state - Default application state
 *
 * @param {Object} action - Response from the API
 *
 * @returns {Object} - Object containing new state
 */
function chatReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT_HISTORY:
      console.log(action, 'from reducer.....')
      return {
        ...state,
        messages: action.message
      };
    default:
      return state;
  }
}

export default chatReducer;
