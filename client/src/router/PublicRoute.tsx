import { Role } from 'enums';
import * as routes from 'constants/routes';
import { useAppSelector } from 'hooks';
import { Navigate, Route, useLocation } from 'react-router-dom';

const PublicElement = ({ element }: any) => {
  const location = useLocation();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const dashboard = user?.role === Role.STUDENT ? routes.STUDENT_DASHBOARD : routes.TEACHER_DASHBOARD;

  return !isAuthenticated ? element : <Navigate to={dashboard} state={{ from: location }} />;
};

//@ts-ignore
export const PublicRoute = ({ element, ...rest }) => {
  return <Route {...rest} element={<PublicElement element={element} />} />;
};
