import { Route, Routes } from 'react-router-dom';
import { CreateAccount, Dashboard, Home, Login, NotFound } from 'sections';
import * as routes from 'constants/routes';
import { PrivateRoute } from './PrivateRoute';

/**
 * Top level application router
 *
 * @returns {Component}
 */
export const Router = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Home />} />
      <Route path={routes.CREATE_ACCOUNT} element={<CreateAccount />} />
      <Route path={routes.LOGIN} element={<Login />} />
      <PrivateRoute path={routes.DASHBOARD} element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
