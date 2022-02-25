import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <main className={`${styles.main} pl-5 pr-5`}>
      <BurgerIngredients />
    </main>
  </div>
);

export default App;
