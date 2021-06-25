import { Menu } from 'antd';
import { useAppSelector } from 'hooks';
import { NavLink } from 'react-router-dom';
import { displaySuccessNotification } from 'utils/notifications';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Item } = Menu;

export const MenuItems = () => {
  const { user } = useAppSelector((state) => state.auth);

  const onLogOut = () => {
    displaySuccessNotification("You've successfully logged out!");
  };

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
      <Item key="/user" className="app-header__menu-item">
        <NavLink to={`/user/${user?.id}`}>
          {' '}
          <Avatar size="large" icon={<UserOutlined />} />
        </NavLink>
      </Item>
      <Item key="/logout" className="app-header__menu-item" onClick={onLogOut}>
        <button className="btn--primary">Logout</button>
      </Item>
    </>
  );
  return (
    <Menu mode="horizontal" selectable={false} className="app-header__menu">
      {user?.id ? privateLinks : publicLinks}
    </Menu>
  );
};
