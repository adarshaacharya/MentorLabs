import { Route, Routes } from 'react-router-dom';
import { CreateAccount, Home, Login } from 'sections';
import * as routes from 'constants/routes';

// Top level application router.
export const Router = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Home />} />
      <Route path={routes.CREATE_ACCOUNT} element={<CreateAccount />} />
      <Route path={routes.LOGIN} element={<Login />} />
    </Routes>
  );
};
