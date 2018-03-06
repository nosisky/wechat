import {
  GET_CHAT_HISTORY, NEW_MESSAGE
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
      return {
        ...state,
        messages: action.message
      };

    case NEW_MESSAGE:
      let allMessage = state.messages;
      let { message } = action;

      return {
        ...state,
        messages: allMessage.concat([message])
      };
    default:
      return state;
  }
}

export default chatReducer;
