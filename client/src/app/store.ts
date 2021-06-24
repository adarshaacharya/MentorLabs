import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootReducer from 'slices';
import { setAuthToken } from 'services/token';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

/**
 * store subscription listener to set token in LOcalstorage
 */
let currentState = store.getState();

store.subscribe(() => {
  let prevState = currentState;
  currentState = store.getState();

  if (prevState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    if (token) {
      setAuthToken(token);
    }
  }
});

/**
 * define data types for redux utilities
 */
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
