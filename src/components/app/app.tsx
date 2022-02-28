import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import styles from './app.module.css';

const App = () => {

  const [ingredients, setIngredients] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(true);

  const onModalOpen = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);
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
  }, [])

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
        {!!ingredients.length && <BurgerIngredients data={ingredients}/>}
        {!!ingredients.length && <BurgerConstructor data={ingredients}/>}
      </main>
      {isModalOpen && (
        <Modal onClose={onModalClose} header='Детали ингредиента'>
        </Modal>
      )}
    </div>
  );
};

export default App;
