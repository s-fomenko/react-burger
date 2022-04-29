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
    path: '/logout',
  },
];

const ProfileNavigation = (): JSX.Element => (
  <div>
    <ul className={styles.list}>
      {links.map((route, index) => (
        <li key={index} className={`${styles.item} text text_type_main-medium`}>
          <NavLink to={route.path} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
            {route.name}
          </NavLink>
        </li>
      ))}
    </ul>
    <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
      В этом разделе вы можете изменить свои персональные
    </p>
  </div>
);

export default ProfileNavigation;
