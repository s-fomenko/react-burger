import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {data} from "../../utils/data";
import styles from './app.module.css';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <main className={`${styles.main} pl-5 pr-5`}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  </div>
);

export default App;
