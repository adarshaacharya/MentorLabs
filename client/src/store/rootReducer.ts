import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import usersReducer from './users/users.slice';
import profileReducer from './profile/profile.slice';
import mentorshipSlice from './mentorship/mentorship.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  profile: profileReducer,
  mentorShip: mentorshipSlice,
});

export default rootReducer;
