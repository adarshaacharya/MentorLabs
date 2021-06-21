import { Affix, Layout } from 'antd';
import { Router } from './router/Router';
import { AppHeader } from './sections';
import './styles/index.css';

const App = () => {
  return (
    <Layout id="app">
      <Affix offsetTop={0} className="app__affix-header">
        <AppHeader />
      </Affix>
      <Router />
    </Layout>
  );
};

export default App;
