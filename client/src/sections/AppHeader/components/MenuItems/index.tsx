import { Menu } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { NavLink } from 'react-router-dom';
import { displaySuccessNotification } from 'utils/notifications';
import { Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { logOut } from 'store/auth/auth.actions';

const { Item, SubMenu } = Menu;

export const MenuItems = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(logOut());
    displaySuccessNotification("You've successfully logged out!");
  };

  const publicLinks = (
    <>
      <Item key="/login" className="app-header__menu-item--public">
        <NavLink to="/login">Sign In</NavLink>
      </Item>
      <Item key="/create-account" className="app-header__menu-item--public">
        <NavLink to="/create-account" className="app-header__create-account" style={{ color: '#fff' }}>
          Create Account
        </NavLink>
      </Item>
    </>
  );

  const privateLinks = (
    <>
      <SubMenu
        title={<Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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
    </>
  );

  return (
    <Menu mode="horizontal" selectable={false} className="app-header__menu">
      {user?.id ? privateLinks : publicLinks}
    </Menu>
  );
};
