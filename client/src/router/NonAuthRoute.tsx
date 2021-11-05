import { useAppSelector } from 'hooks';
import { Navigate, useLocation } from 'react-router';
import * as routes from 'constants/routes';
import { Role } from 'enums';

export const NonAuthRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const dashboard = user?.role === Role.STUDENT ? routes.STUDENT_DASHBOARD : routes.TEACHER_DASHBOARD;

  if (isAuthenticated) {
    return <Navigate to={dashboard} state={{ from: location }} />;
  }

  return children;
};
