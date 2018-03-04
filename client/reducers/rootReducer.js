import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';

const appReducer = combineReducers({
  auth: authReducer,
  chats: chatReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'unauth_user') {
    state.auth.user = {};
  }

  return appReducer(state, action);
};

export default rootReducer;
