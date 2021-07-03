import { ROLE } from 'constants/roles';
import * as routes from 'constants/routes';
import { useAppSelector } from 'hooks';
import { Navigate, Route, useLocation } from 'react-router-dom';

interface Props {
  element: React.ReactElement;
  requiredRoles: Array<ROLE>;
  path?: string;
}
/**
 * A wrapper around the element which checks if the user is authenticated
 * If authenticated, renders the passed element
 * If not authenticated, redirects the user to Login page.
 */
const PrivateElement: React.FC<Props> = ({ element, requiredRoles }) => {
  let location = useLocation();
  const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);

  if (loading) return <p className="container">Checking auth..</p>;

  const userHasRequiredRole = user.role && requiredRoles.includes(user.role);

  return isAuthenticated && userHasRequiredRole ? element : <Navigate to={routes.LOGIN} state={{ from: location }} />;
};

export const PrivateRoute: React.FC<Props> = ({ element, requiredRoles, ...rest }) => {
  return <Route {...rest} element={<PrivateElement element={element} requiredRoles={requiredRoles} />} />;
};
