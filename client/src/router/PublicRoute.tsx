import { useAppSelector } from 'hooks';
import { RouteProps } from 'react-router';
import { Route, Navigate } from 'react-router-dom';
import * as routes from 'constants/routes';

interface PublicRouteProps extends RouteProps {
  element: any;
}

export const PublicRoute = ({ element, ...rest }: PublicRouteProps) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <p>Checking auth</p>;
  }

  if (isAuthenticated) {
    return <Navigate to={routes.DASHBOARD} />;
  }
  return <Route element={element} {...rest} />;
};
