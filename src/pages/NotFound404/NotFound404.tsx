import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound404.module.css';

const NotFound404 = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <h1 className={styles.title}>
        Кажется здесь ничего нет
      </h1>
      <Link to='/' className={styles.link}>
        Вернуться на главную
      </Link>
    </div>
  </div>
);

export default NotFound404;
