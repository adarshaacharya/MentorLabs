import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppSelector } from 'hooks';

const { Item } = Menu;

const publicLinks = (
  <>
    <Item key="/login" className="app-header__menu-item">
      <NavLink to="/login">Sign In</NavLink>
    </Item>
    <Item key="/create-account" className="app-header__menu-item">
      <NavLink to="/create-account" className="app-header__create-account" style={{ color: '#fff' }}>
        Create Account
      </NavLink>
    </Item>
  </>
);

const privateLinks = (
  <>
    <Item key="/logout" className="app-header__menu-item">
      <LogoutOutlined></LogoutOutlined> Log out
    </Item>
  </>
);

export const MenuItems = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Menu mode="horizontal" selectable={false} className="app-header__menu">
      {isAuthenticated ? privateLinks : publicLinks}
    </Menu>
  );
};
