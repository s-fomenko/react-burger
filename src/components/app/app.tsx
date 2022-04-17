import React, {useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {useDispatch, useSelector} from 'react-redux';
import {getIngredients} from '../../services/reducers/burger-ingredients';
import {
  removeCurrentItem,
  resetModalType,
  resetOrderNumber,
  selectModal,
  toggleModalOpen
} from '../../services/reducers/modal';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import styles from './app.module.css';

const App = () => {
  const { currentItem, modalType, isModalOpen } = useSelector(selectModal);
  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(toggleModalOpen());
    dispatch(resetModalType());
    modalType === 'ingredient' ? dispatch(removeCurrentItem()) : dispatch(resetOrderNumber());
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
  );
};

export default App;
