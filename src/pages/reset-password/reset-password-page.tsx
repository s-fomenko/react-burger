import React, {SyntheticEvent, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password-page.module.css';
import {BASE_API_URL} from "../../constants/api";

type FormValue = {
  password: string;
  token: string;

}

const ResetPasswordPage = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    password: '',
    token: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue(value => ({
      ...value,
      [e.target.name]: e.target.value
    }))
  };

  const resetPassword = async (data: FormValue) => {
    const apiUrl = `${BASE_API_URL}password-reset/reset`;
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const response = await res.json();
      console.log('response', response)
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  }

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();
    resetPassword(formValue)
      .finally(() => setFormValue({
        password: '',
        token: '',
      }))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
        <form className={styles.form}>
          <PasswordInput onChange={onChange} value={formValue.password} name={'password'} />
          <Input onChange={onChange} value={formValue.token} name={'token'} placeholder='Введите код из письма' />
          <Button type="primary" size="large" onClick={onClick}>
            Сохранить
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

export default ResetPasswordPage;
