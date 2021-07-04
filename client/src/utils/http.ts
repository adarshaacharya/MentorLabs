import { store } from 'store';
import Axios from 'axios';
import config from 'config';
import * as status from 'constants/http-status';
import { logOut } from 'store/auth/auth.actions';

const http = Axios.create({
  baseURL: config.baseURI,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * intercepts any response and checks the response from our api for a 401 status in the response. ie. the token has now expired and is no longer valid, or no valid token was sent.
If such a status exists then we log out the user and clear the profile from redux state.
 */
http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.status === status.UNAUTHORIZED) {
      store.dispatch(logOut());
    }

    return Promise.reject(err);
  },
);

export default http;
