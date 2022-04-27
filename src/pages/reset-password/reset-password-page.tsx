import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password-page.module.css';

type FormValue = {
  newPassword: string;
  emailCode: string;
}

const ResetPasswordPage = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    newPassword: '',
    emailCode: '',
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
        <h3 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h3>
        <form className={styles.form}>
          <PasswordInput onChange={onChange} value={formValue.newPassword} name={'newPassword'} />
          <Input onChange={onChange} value={formValue.emailCode} name={'emailCode'} placeholder='Введите код из письма' />
          <Button type="primary" size="large">
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
