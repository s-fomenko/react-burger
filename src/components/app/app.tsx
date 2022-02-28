import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {Data} from "../../models/data";
import styles from './app.module.css';

const App = () => {

  const [ingredients, setIngredients] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentIngredient, setCurrentIngredient] = useState<Data | null>(null);

  const onModalOpen = (ingredient: Data, modalType: string) => {
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
    if (isModalOpen && e.keyCode === 27) {
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
        const data = await res.json();
        setIngredients(data.data);
      } catch (e) {
        console.log(`Error: ${e}`)
      }
    }

    getIngridients();
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={`${styles.main} pl-5 pr-5`}>
        {!!ingredients.length && <BurgerIngredients data={ingredients} chooseCurrent={onModalOpen} />}
        {!!ingredients.length && <BurgerConstructor data={ingredients}/>}
      </main>
      {isModalOpen && modalType === 'ingredient' && (
        <Modal onClose={onModalClose} header='Детали ингредиента'>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </div>
  );
};

export default App;
