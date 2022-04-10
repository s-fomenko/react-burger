import React, { useCallback, useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { OrderContext } from '../../context/orderContext';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/reducers/burger-ingredients';
import { removeCurrentItem, resetModalType, selectModal, toggleModalOpen } from '../../services/reducers/modal';
import styles from './app.module.css';

const App = () => {
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const { currentItem, modalType, isModalOpen } = useSelector(selectModal);
  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(toggleModalOpen());
    dispatch(removeCurrentItem());
    dispatch(resetModalType());
  };
  const onKeyDown = useCallback((e: any) => {
    if (isModalOpen && e.key === 'Escape') {
      dispatch(toggleModalOpen());
    }
  }, [isModalOpen, dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [isModalOpen, onKeyDown])

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <OrderContext.Provider value={orderNumber}>
      <div className={styles.app}>
        <AppHeader/>
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor onOrderRequest={setOrderNumber} />
        </main>
        {isModalOpen && modalType === 'ingredient' && (
          <Modal onClose={onModalClose} header='Детали ингредиента'>
            <IngredientDetails ingredient={currentItem} />
          </Modal>
        )}
        {isModalOpen && modalType === 'total' && (
          <Modal onClose={onModalClose}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </OrderContext.Provider>
  );
};

export default App;
