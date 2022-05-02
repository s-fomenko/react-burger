import React, {useEffect, useState} from 'react';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {getUserData, selectUser} from "../../services/reducers/user";

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
  const { user } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUserData());
  }, [])

  useEffect(() => {
    console.log('user', user)
    setFormValue(value => ({
      ...value,
      name: user.name,
      email: user.email
    }))
  }, [user])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue(value => ({
      ...value,
      [e.target.name]: e.target.value
    }))
  };

  return (
    <form className={styles.form}>
      <Input onChange={onChange} value={formValue.name} name={'name'} placeholder='Имя' />
      <EmailInput onChange={onChange} value={formValue.email} name={'email'} />
      <PasswordInput onChange={onChange} value={formValue.password} name={'password'} />
    </form>
  );
};

export default Profile;
