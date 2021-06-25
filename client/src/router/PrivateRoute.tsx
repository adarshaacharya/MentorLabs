import { useAppSelector } from 'hooks';
import { RouteProps } from 'react-router';
import { Route, Navigate, useLocation } from 'react-router-dom';
import * as routes from 'constants/routes';

interface PrivateRouteProps extends RouteProps {
  element: any;
}

export const PrivateRoute = ({ element, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={routes.LOGIN} />;
  }
  return <Route {...rest} element={element} />;
};
