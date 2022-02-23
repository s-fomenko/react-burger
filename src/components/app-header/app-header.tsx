import React from 'react';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={`${styles.header} p-4`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles.item} p-5`}>
            <BurgerIcon type='primary' />
            <span className='pl-2 text text_type_main-default'>Конструктор</span>
          </li>
          <li className={`${styles.item} p-5`}>
            <ListIcon type="primary" />
            <span className='pl-2 text text_type_main-default'>Лента заказов</span>
          </li>
          <li className={styles.logo}>
            <Logo />
          </li>
          <li className={`${styles.item} p-5`}>
            <ProfileIcon type="primary" />
            <span className='pl-2 text text_type_main-default'>Личный кабинет</span>
          </li>
        </ul>
      </nav>
    </header>
    );
};

export default AppHeader;
