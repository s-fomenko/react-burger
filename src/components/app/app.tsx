import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
// import {data} from "../../utils/data";
import styles from './app.module.css';

const App = () => {

  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

    const getIngridients = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setIngredients(data.data);
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
    </div>
  );
};

export default App;
