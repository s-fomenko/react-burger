import React, {useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients} from '../../services/reducers/burger-ingredients';
import {removeCurrentItem, resetOrderNumber, selectModal} from '../../services/reducers/modal';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import styles from './app.module.css';

const App = () => {
  const { currentItem, orderNumber } = useSelector(selectModal);
  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(removeCurrentItem());
    dispatch(resetOrderNumber());
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={`${styles.main} pl-5 pr-5`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
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
