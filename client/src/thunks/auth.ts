import { AppDispatch, AppThunk } from 'app/store';
import config from 'config';
import { authError, authStart, authSuccess, setCurrentUser } from 'slices/auth';
import { CreateAccountData } from 'types';
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
      const {
        data: { token },
      } = await http.post(url, { name, email, password, role });
      dispatch(authSuccess(token));
      dispatch(loadCurrentUser());
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      dispatch(authError(message));
    }
  };
