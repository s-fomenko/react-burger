import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forgot-password-page.module.css';

const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
        <form className={styles.form}>
          <EmailInput onChange={onChange} value={emailValue} name={'email'} />
          <Button type="primary" size="large">
            Восстановить
          </Button>
        </form>
        <div className={`${styles.linksWrapper} text text_type_main-default`}>
          <div className={styles.linkWrapper}>
            <span className='text_color_inactive'>Вспомнили пароль?</span>
            <Link to='/login' className={styles.link}>Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
