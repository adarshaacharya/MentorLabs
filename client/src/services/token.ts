import { X_AUTH_TOKEN } from 'constants/header';
import { ACCESS_TOKEN } from 'constants/storage';
import http from '../utils/http';
import * as storage from '../utils/storage';

/**
 * Set token in header and save token to localstorage
 * if there is a token - store it in local storage and set the headers.
 * if there is no token - token is null - remove it from storage and delete the headers.
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    http.defaults.headers.common[X_AUTH_TOKEN] = token;
    storage.set(ACCESS_TOKEN, token);
  } else {
    delete http.defaults.headers.common[X_AUTH_TOKEN];
    storage.remove(ACCESS_TOKEN);
  }
};
