import { configureStore } from '@reduxjs/toolkit';
import { setAuthToken } from 'services/token';
import rootReducer from 'store/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

/**
 * store subscription listener to set token in Localstorage
 */
let currentState = store.getState();

store.subscribe(() => {
  let prevState = currentState;
  currentState = store.getState();

  if (prevState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});
