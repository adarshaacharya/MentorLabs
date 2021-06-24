import { Affix, Layout } from 'antd';
import { Router } from './router/Router';
import { AppHeader } from './sections';
import './styles/index.css';

const App = () => {
  return (
    <Layout id="app">
      <AppHeader />
      <Router />
    </Layout>
  );
};

export default App;
