import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getUserData, selectUser, updateToken, updateUserData} from "../../services/reducers/user";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

type FormValue = {
  name: string;
  email: string;
  password: string;
}

const Profile = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { user, accessToken, refreshToken } = useSelector(selectUser);

  useEffect(() => {
    console.log('refreshToken', Cookies.get('refreshToken'))
    if (Cookies.get('refreshToken')) {
      dispatch(updateToken());
      dispatch(getUserData(accessToken));
    }
  }, [])

  useEffect(() => {
    if (user) {
      setFormValue(value => ({
        ...value,
        name: user.name,
        email: user.email
      }))
    }
  }, [user])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue(value => ({
      ...value,
      [e.target.name]: e.target.value
    }))
  };

  const onConfirm = (e: SyntheticEvent): void => {
    e.preventDefault();
    dispatch(updateToken());
    dispatch(updateUserData({name: formValue.name, email: formValue.email, token: accessToken}))
  };

  const onCancel = (e: SyntheticEvent): void => {
    e.preventDefault();
    setFormValue(value => ({
      ...value,
      name: user.name,
      email: user.email
    }))
  };

  return (
    <form className={styles.form}>
      <Input onChange={onChange} value={formValue.name} name={'name'} placeholder='Имя' />
      <EmailInput onChange={onChange} value={formValue.email} name={'email'} />
      <PasswordInput onChange={onChange} value={formValue.password} name={'password'} />
      <Button type="primary" size="large" onClick={onConfirm}>
        Сохранить
      </Button>
      <Button type="secondary" size="medium" onClick={onCancel}>
        Отмена
      </Button>
    </form>
  );
};

export default Profile;
