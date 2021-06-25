import { useAppSelector } from 'hooks';
import { RouteProps } from 'react-router';
import { Route, Navigate } from 'react-router-dom';
import * as routes from 'constants/routes';

interface PublicRouteProps extends RouteProps {
  element: any;
}

export const PublicRoute = ({ element, ...rest }: PublicRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={routes.DASHBOARD} />;
  }
  return <Route element={element} {...rest} />;
};
