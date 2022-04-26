import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register-page.module.css';

type FormValue = {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    name: '',
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue(value => ({
      ...value,
      [e.target.name]: e.target.value
    }))
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Регистрация</h3>
        <form className={styles.form}>
          <Input onChange={onChange} value={formValue.name} name={'name'} placeholder='Имя' />
          <EmailInput onChange={onChange} value={formValue.email} name={'email'} />
          <PasswordInput onChange={onChange} value={formValue.password} name={'password'} />
          <Button type="primary" size="large">
            Зарегистрироваться
          </Button>
        </form>
        <div className={`${styles.linksWrapper} text text_type_main-default`}>
          <div className={styles.linkWrapper}>
            <span className='text_color_inactive'>Уже зарегистрированы?</span>
            <Link to='/login' className={styles.link}>Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
