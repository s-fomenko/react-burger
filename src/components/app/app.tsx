import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {Data} from '../../models/data';
import {IngredientsContext} from '../../context/ingriedientsContext';
import {OrderContext} from "../../context/orderContext";
import styles from "./app.module.css";

const App = () => {

  const [ingredients, setIngredients] = useState([]);
  const [orderNumber, setOrderNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentIngredient, setCurrentIngredient] = useState<Data | null>(null);

  const onModalOpen = (ingredient: Data | null, modalType: string) => {
    setCurrentIngredient(ingredient);
    setModalType(modalType);
    setIsModalOpen(true)
  };
  const onModalClose = () => {
    setIsModalOpen(false);
    setCurrentIngredient(null);
    setModalType('');
  };
  const onKeyDown = (e: any) => {
    if (isModalOpen && e.key === 'Escape') {
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [isModalOpen])

  useEffect(() => {
    const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

    const getIngridients = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error('Ответ сети был не ok.');
        }
        const data = await res.json();
        setIngredients(data.data);
      } catch (e) {
        console.log(`Error: ${e}`)
      }
    }

    getIngridients();
  }, [])

  return (
    <IngredientsContext.Provider value={ingredients}>
      <OrderContext.Provider value={orderNumber}>
        <div className={styles.app}>
          <AppHeader/>
          <main className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients chooseCurrent={onModalOpen} />
            <BurgerConstructor showTotal={onModalOpen} onOrderRequest={setOrderNumber} />
          </main>
          {isModalOpen && modalType === 'ingredient' && (
            <Modal onClose={onModalClose} header='Детали ингредиента'>
              <IngredientDetails ingredient={currentIngredient} />
            </Modal>
          )}
          {isModalOpen && modalType === 'total' && (
            <Modal onClose={onModalClose}>
              <OrderDetails />
            </Modal>
          )}
        </div>
      </OrderContext.Provider>
    </IngredientsContext.Provider>
  );
};

export default App;
