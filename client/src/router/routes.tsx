import { Route, Routes } from 'react-router-dom';
import { CreateAccount, Home, Login } from '../sections';

export const useRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
