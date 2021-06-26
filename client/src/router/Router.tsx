import * as routes from 'constants/routes';
import { Route, Routes } from 'react-router-dom';
import { CreateAccount, Dashboard, Home, Login, NotFound } from 'sections';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

/**
 * Top level application router
 *
 * @returns {Component}
 */
export const Router = () => {
  return (
    <Routes>
      <PublicRoute path={routes.HOME} element={<Home />} />
      <PublicRoute path={routes.CREATE_ACCOUNT} element={<CreateAccount />} />
      <PublicRoute path={routes.LOGIN} element={<Login />} />
      <PrivateRoute path={routes.DASHBOARD} element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
