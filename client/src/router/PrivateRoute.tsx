import { useAppSelector } from 'hooks/reduxHooks';
import { Navigate, Route, RouteProps } from 'react-router';
import * as routes from 'constants/routes';

interface PrivateRouteProps extends RouteProps {}

/**
 * Component to authenticate routes.
 */

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...props }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={routes.LOGIN} />;
  }

  return <Route {...props} />;
};
