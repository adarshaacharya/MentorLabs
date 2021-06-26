import * as routes from 'constants/routes';
import { useAppSelector } from 'hooks';
import { Navigate, Route, useLocation } from 'react-router-dom';

/**
 * A wrapper around the element which checks if the user is authenticated
 * If authenticated, renders the passed element
 * If not authenticated, redirects the user to Login page.
 */
//@ts-ignore
const PrivateElement = ({ element }) => {
  let location = useLocation();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  return isAuthenticated ? element : <Navigate to={routes.LOGIN} state={{ from: location }} />;
};

//@ts-ignore
export const PrivateRoute = ({ element, ...rest }) => {
  return <Route {...rest} element={<PrivateElement element={element} />} />;
};
