import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { BASE_API_URL } from "../../constants/api";
import styles from './forgot-password-page.module.css';

const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(e.target.value);
  };

  const resetPassword = async (email: string) => {
    const apiUrl = `${BASE_API_URL}password-reset`;
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email": email})
      });
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const response = await res.json();
      // todo: Написать логику переадресации на /reset-password
      console.log('response', response)
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();
    resetPassword(emailValue);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
        <form className={styles.form}>
          <EmailInput onChange={onChange} value={emailValue} name={'email'} />
          <Button type="primary" size="large" onClick={onClick}>
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
