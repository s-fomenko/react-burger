import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile-navigation.module.css';

type ProfileLinks = {
  name: string;
  path: string;
}

const links: ProfileLinks[] = [
  {
    name: 'Профиль',
    path: '/profile',
  },
  {
    name: 'История заказов',
    path: '/profile/orders',
  },
  {
    name: 'Выход',
    path: '',
  },
];

const ProfileNavigation = (): JSX.Element => (
  <ul>
    {links.map((route, index) => (
      <li key={index}>
        <NavLink to={route.path}>
          {route.name}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default ProfileNavigation;
