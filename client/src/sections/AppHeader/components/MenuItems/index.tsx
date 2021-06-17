import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
const { Item, SubMenu } = Menu;

const publicLinks = (
  <>
    <Item key="/login" className="app-header__menu-item">
      <NavLink to="/login">Login</NavLink>
    </Item>
    <Item key="/create-account" className="app-header__menu-item">
      <NavLink to="/create-account" className="app-header__create-account" style={{ color: '#fff' }}>
        Create Account
      </NavLink>
    </Item>
  </>
);

export const MenuItems = () => {
  return (
    <Menu mode="horizontal" selectable={false} className="app-header__menu">
      {publicLinks}
    </Menu>
  );
};
