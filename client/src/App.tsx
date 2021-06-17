import { Affix, Layout } from 'antd';
import { Routes } from 'react-router-dom';
import { useRouters } from './router/routes';
import { AppHeader } from './sections';
import './styles/index.css';

const App = () => {
  const routes = useRouters();

  return (
    <>
      <Layout id="app">
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader />
        </Affix>
        {routes}
      </Layout>
    </>
  );
};

export default App;
