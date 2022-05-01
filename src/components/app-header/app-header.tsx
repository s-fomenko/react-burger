import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';

const AppHeader = () => {

  return (
    <header className={`${styles.header} p-4`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className='p-5'>
            <NavLink to='/' className={(isActive) => isActive ? styles.itemActive : styles.item }>
              <BurgerIcon type='primary' />
              <span className='pl-2 text text_type_main-default'>Конструктор</span>
            </NavLink>
          </li>
          <li className='p-5'>
            <NavLink to='/orders' className={(isActive) => isActive ? styles.itemActive : styles.item }>
              <ListIcon type="primary" />
              <span className='pl-2 text text_type_main-default'>Лента заказов</span>
            </NavLink>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li className='p-5'>
            <NavLink to='/profile' className={(isActive) => isActive ? styles.itemActive : styles.item }>
              <ProfileIcon type="primary" />
              <span className='pl-2 text text_type_main-default'>Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    );
};

export default AppHeader;
