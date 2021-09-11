import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import usersReducer from './users/users.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;
