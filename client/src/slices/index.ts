import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
