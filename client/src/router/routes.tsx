import { Route } from 'react-router-dom';
import { Home } from '../sections';

export const useRouters = () => {
  return <Route path="/" element={<Home />} />;
};
