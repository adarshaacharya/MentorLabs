import { useAppSelector } from 'hooks';
import { Navigate, useLocation } from 'react-router';
import * as routes from 'constants/routes';
import { Role } from 'enums';
import { AccessDenied } from 'sections';

/**
 * A wrapper around the element which checks if the user is authenticated
 * If authenticated, renders the passed element
 * If not authenticated, redirects the user to Login page.
 */
export const AuthRoute = ({ children, roles }: { children: JSX.Element; roles: Array<Role> }) => {
  let location = useLocation();

  const { isAuthenticated, user, status } = useAppSelector((state) => state.auth);

  if (status === 'idle' || status === 'pending') return <p className="container">Checking in..</p>;

  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

  if (!isAuthenticated) {
    return <Navigate to={routes.LOGIN} state={{ from: location }} />;
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return children;
};
