import React, { useEffect } from 'react';
import { Route, Switch } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, resetCounts } from '../../services/reducers/burger-ingredients';
import { removeCurrentItem, resetOrderNumber, selectModal } from '../../services/reducers/modal';
import { resetConstructor } from '../../services/reducers/burger-constructor';
import AppHeader from '../app-header/app-header';
import ConstructorPage from '../../pages/constructor-page/constructor-page';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from "../../pages/register-page/register-page";
import NotFound404 from '../../pages/NotFound404/NotFound404';
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import styles from './app.module.css';

const App = () => {
  const { currentItem, orderNumber } = useSelector(selectModal);
  const dispatch = useDispatch();

  const onModalClose = () => {
    if (currentItem) {
      dispatch(removeCurrentItem());
    }

    if (orderNumber) {
      dispatch(resetOrderNumber());
      dispatch(resetConstructor());
      dispatch(resetCounts());
    }
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <div className={styles.app}>
      <AppHeader/>
      <Switch>
      <Route exact path='/'>
        <ConstructorPage />
      </Route>
      <Route exact path='/login'>
        <LoginPage />
      </Route>
      <Route exact path='/register'>
        <RegisterPage />
      </Route>
        <Route exact path='/forgot-password'>
          <ForgotPasswordPage />
        </Route>
        <Route exact path='/reset-password'>
          <ResetPasswordPage />
        </Route>
        <Route exact path='/profile'>
          <ProfilePage />
        </Route>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
      {currentItem && (
        <Modal onClose={onModalClose} header='Детали ингредиента'>
          <IngredientDetails ingredient={currentItem} />
        </Modal>
      )}
      {orderNumber && (
        <Modal onClose={onModalClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default App;
