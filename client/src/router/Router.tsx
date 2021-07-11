import { Role } from 'constants/roles';
import * as routes from 'constants/routes';
import { Route, Routes } from 'react-router-dom';
import { CreateAccount, Home, Login, NotFound, Student, Teacher } from 'sections';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

/**
 * Top level application router
 *
 * @returns {Component}
 */
export const Router = () => {
  return (
    <Routes>
      <PublicRoute path={routes.HOME} element={<Home />} />
      <PublicRoute path={routes.CREATE_ACCOUNT} element={<CreateAccount />} />
      <PublicRoute path={routes.LOGIN} element={<Login />} />
      <PrivateRoute path={routes.STUDENT_DASHBOARD} element={<Student />} requiredRoles={[Role.STUDENT]} />
      <PrivateRoute path={routes.TEACHER_DASHBOARD} element={<Teacher />} requiredRoles={[Role.TEACHER]} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
