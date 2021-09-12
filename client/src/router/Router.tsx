import { Role } from 'constants/roles';
import * as routes from 'constants/routes';
import { Route, Routes } from 'react-router-dom';
import { CreateAccount, Home, Login, NotFound, Student, Teacher } from 'sections';
import { Profile } from 'sections/Profile';
import { ProfileCreate } from 'sections/Profile/components/ProfileCreate';
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
      <PrivateRoute path={routes.USER_PROFILE} element={<Profile />} requiredRoles={[Role.STUDENT]} />
      <PrivateRoute
        path={routes.CREATE_PROFILE}
        element={<ProfileCreate />}
        requiredRoles={[Role.STUDENT, Role.TEACHER]}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
