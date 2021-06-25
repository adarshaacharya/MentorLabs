import { Layout } from 'antd';
import { store } from 'store';
import { ACCESS_TOKEN } from 'constants/storage';
import { useEffect } from 'react';
import { setAuthToken } from 'services/token';
import { logoutSuccess } from 'store/auth/auth.slice';
import { loadCurrentUser } from 'store/auth/auth.actions';
import * as storage from 'utils/storage';
import { Router } from './router/Router';
import { AppHeader } from './sections';
import './styles/index.css';

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
