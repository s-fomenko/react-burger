import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login-page.module.css';

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.name === 'email' ? setEmailValue(e.target.value) : setPasswordValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Вход</h3>
        <form className={styles.form}>
          <EmailInput onChange={onChange} value={emailValue} name={'email'} />
          <PasswordInput onChange={onChange} value={passwordValue} name={'password'} />
          <Button type="primary" size="large">
            Войти
          </Button>
        </form>
        <div className={`${styles.linksWrapper} text text_type_main-default`}>
          <div className={styles.linkWrapper}>
            <span className='text_color_inactive'>Вы — новый пользователь?</span>
            <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
          </div>
          <div className={styles.linkWrapper}>
            <span className='text_color_inactive'>Забыли пароль?</span>
            <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
