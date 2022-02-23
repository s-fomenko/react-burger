import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";

const App = () => {
  return (
      <div className={styles.app}>
        <AppHeader />
      </div>
  );
};

export default App;
