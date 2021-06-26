import * as routes from 'constants/routes';
import { useAppSelector } from 'hooks';
import { Navigate, Route, useLocation } from 'react-router-dom';

const PublicElement = ({ element }: any) => {
  const location = useLocation();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated === false ? element : <Navigate to={routes.DASHBOARD} state={{ from: location }} />;
};

//@ts-ignore
export const PublicRoute = ({ element, ...rest }) => {
  return <Route {...rest} element={<PublicElement element={element} />} />;
};
