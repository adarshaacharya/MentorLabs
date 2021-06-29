import config from 'config';
import { authError, authStart, authSuccess, logOutSuccess, setCurrentUser } from 'store/auth/auth.slice';
import { AppDispatch, AppThunk, CreateAccountData, LoginData } from 'types';
import http from 'utils/http';

export const loadCurrentUser = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const url = config.endpoints.auth.me;
    const {
      data: { user },
    } = await http.get(url);
    dispatch(setCurrentUser(user));
  } catch (err) {
    const {
      response: {
        data: { message },
      },
    } = err;
    dispatch(authError(message));
  }
};

export const createAccount =
  ({ name, email, password, role }: CreateAccountData): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(authStart());
      const url = config.endpoints.auth.createAccount;
      await http.post(url, { name, email, password, role });
      dispatch(authSuccess());
      dispatch(loadCurrentUser());
    } catch (err) {
      console.log(err.response.data);
      const {
        response: {
          data: { message },
        },
      } = err;
      dispatch(authError(message));
    }
  };

export const logIn =
  ({ email, password }: LoginData): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(authStart());
      const url = config.endpoints.auth.login;
      await http.post(url, { email, password });
      dispatch(authSuccess());
      dispatch(loadCurrentUser());
    } catch (err) {
      console.log(err.response.data);
      const {
        response: {
          data: { message },
        },
      } = err;
      dispatch(authError(message));
    }
  };

export const logOut = (): AppThunk => async (dispatch: AppDispatch) => {
  const url = config.endpoints.auth.logout;
  await http.post(url);
  dispatch(logOutSuccess());
};
