import { useAppSelector } from 'hooks';
import { RouteProps } from 'react-router';
import { Route, Navigate, useLocation } from 'react-router-dom';
import * as routes from 'constants/routes';

interface PrivateRouteProps extends RouteProps {
  element: any;
}

export const PrivateRoute = ({ element, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <p>Checking auth</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to={routes.LOGIN} />;
  }

  return <Route {...rest} element={element} />;
};
