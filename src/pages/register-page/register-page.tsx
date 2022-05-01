import React, {SyntheticEvent, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import {RegisterData} from '../../models/user';
import { useDispatch } from 'react-redux';
import styles from './register-page.module.css';
import {register} from "../../services/reducers/user";

const RegisterPage = () => {
  const [formValue, setFormValue] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue(value => ({
      ...value,
      [e.target.name]: e.target.value
    }))
  };

  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register(formValue));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={`${styles.title} text text_type_main-medium`}>Регистрация</h3>
        <form className={styles.form}>
          <Input onChange={onChange} value={formValue.name} name={'name'} placeholder='Имя' />
          <EmailInput onChange={onChange} value={formValue.email} name={'email'} />
          <PasswordInput onChange={onChange} value={formValue.password} name={'password'} />
          <Button type="primary" size="large" onClick={onClick}>
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
