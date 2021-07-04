import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import errorReducer from './error/error.slice';

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;
