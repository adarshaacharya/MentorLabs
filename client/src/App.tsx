import { Layout } from 'antd';
import { store } from 'store';
import { ACCESS_TOKEN } from 'constants/storage';
import { useEffect } from 'react';
import { setAuthToken } from 'services/token';
import { logOutSuccess } from 'store/auth/auth.slice';
import { loadCurrentUser } from 'store/auth/auth.actions';
import * as storage from 'utils/storage';
import { Router } from './router/Router';
import { AppHeader } from './sections';
import './styles/index.css';

const App = () => {
  /*Heart of Application*/
  // during application first load or refresh
  useEffect(() => {
    if (storage.get(ACCESS_TOKEN)) {
      setAuthToken(storage.get(ACCESS_TOKEN));
      store.dispatch(loadCurrentUser());
    }

    // log out user from all tabs if they logout from one tab
    window.addEventListener('storage', () => {
      if (!storage.get(ACCESS_TOKEN)) store.dispatch(logOutSuccess());
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
