import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile-navigation.module.css';

const ProfileNavigation = (): JSX.Element => (
  <div>
    <ul className={styles.list}>
      <li className={`${styles.item} text text_type_main-medium`}>
        <NavLink to='/profile' className={(isActive ) => isActive ? styles.activeLink : styles.link} >
          Профиль
        </NavLink>
      </li>
      <li className={`${styles.item} text text_type_main-medium`}>
        <NavLink to='/profile/orders' className={( isActive ) => isActive ? styles.activeLink : styles.link} >
          История заказов
        </NavLink>
      </li>
      <li className={`${styles.item} text text_type_main-medium`}>
        <NavLink to='/login' className={( isActive ) => isActive ? styles.activeLink : styles.link} >
          Выход
        </NavLink>
      </li>
    </ul>
    <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
      В этом разделе вы можете изменить свои персональные
    </p>
  </div>
);

export default ProfileNavigation;
