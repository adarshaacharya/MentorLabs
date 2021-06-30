import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { NavLink } from 'react-router-dom';
import { logOut } from 'store/auth/auth.actions';
import { displaySuccessNotification } from 'utils/notifications';

const { Item, SubMenu } = Menu;

export const MenuItems = () => {
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(logOut());
    displaySuccessNotification("You've successfully logged out!");
  };

  if (loading) return <p>Loading nav.</p>;

  if (isAuthenticated && !user) return <p>Loading user.</p>;

  const publicLinks = (
    <div className="app-header__menu--public">
      <div key="/login" className="app-header__menu-item--public">
        <NavLink to="/login" style={{ color: '#000000cf' }}>
          Sign In
        </NavLink>
      </div>
      <div key="/create-account" className="app-header__menu-item--public">
        <NavLink to="/create-account" className="app-header__create-account" style={{ color: '#fff' }}>
          Create Account
        </NavLink>
      </div>
    </div>
  );

  const privateLinks = (
    <Menu mode="horizontal" selectable={false} className="app-header__menu--private">
      <SubMenu
        title={<Avatar size="large" src={user?.avatar} />}
        className="app-header__sub-menu--private"
        key="submenu"
      >
        <Item key="/user">
          <NavLink to={`/user/${user?.id}`}>
            <UserOutlined></UserOutlined> Profile
          </NavLink>
        </Item>
        <Item key="/logout" onClick={onLogOut}>
          <LogoutOutlined></LogoutOutlined> Log out
        </Item>
      </SubMenu>
    </Menu>
  );

  return user?.id && user.avatar ? privateLinks : publicLinks;
};
