import { Layout } from 'antd';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { useEffect } from 'react';
import { store } from 'store';
import { loadCurrentUser } from 'store/auth/auth.actions';
import { Router } from './router/Router';
import { AppHeader } from './sections';
import './styles/index.css';

const App = () => {
  /**
   * during application first load or refresh
   */
  useEffect(() => {
    store.dispatch(loadCurrentUser());
  }, []);

  return (
    <ErrorBoundary>
      <Layout id="app">
        <AppHeader />
        <Router />
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
