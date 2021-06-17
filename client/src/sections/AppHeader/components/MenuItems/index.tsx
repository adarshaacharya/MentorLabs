import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
const { Item, SubMenu } = Menu;

const publicLinks = (
  <>
    <Item key="/home" className="app-header__menu-item">
      <NavLink to="/">
        <HomeOutlined /> &nbsp; Home
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
