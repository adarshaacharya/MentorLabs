import { Layout } from 'antd';
import { useCallback, useEffect } from 'react';
import { Router } from './router/Router';
import { AppHeader } from './sections';
import './styles/index.css';
import * as storage from 'utils/storage';
import { ACCESS_TOKEN } from 'constants/storage';
import { setAuthToken } from 'services/token';
import { store } from 'app/store';
import { loadCurrentUser } from 'thunks/auth';
import { logoutSuccess } from 'slices/auth';

const App = () => {
  // logic to set/check access token **Heart of Application*
  useEffect(() => {
    if (storage.get(ACCESS_TOKEN)) {
      setAuthToken(storage.get(ACCESS_TOKEN));
      store.dispatch(loadCurrentUser());
    }

    // log out user from all tabs if they logout from one tab
    window.addEventListener('storage', () => {
      if (!storage.get(ACCESS_TOKEN)) store.dispatch(logoutSuccess());
    });
  }, []);

  return (
    <Layout id="app">
      <AppHeader />
      <Router />
    </Layout>
  );
};

export default App;
