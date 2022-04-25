import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
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
import NotFound404 from '../../pages/NotFound404/NotFound404';
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
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
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
