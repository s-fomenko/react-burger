import React, {useState} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import {Data} from "../../models/data";
import styles from './burger-ingredients-item.module.css';

type Props = {
  ingredient: Data;
  chooseCurrentItem: (ingredient: Data | null, modalType: string) => void;
};

const BurgerIngredientsItem = ({ ingredient, chooseCurrentItem }: Props) => {
  const [count, setCount] = useState(0);

  return (
    <section className={styles.wrapper} onClick={() => chooseCurrentItem(ingredient, 'ingredient')}>
      <div className={`${styles.imageWrapper} pl-4 pr-4`}>
        <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
      </div>
      <div className={`${styles.priceWrapper} mt-1 mb-1`}>
        <span className={`${styles.price} text text_type_digits-default`}>{ingredient.price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      {count > 0 &&
        (<div className={styles.counterWrapper}>
          <Counter count={count} size="default"/>
        </div>)}
    </section>
  );
};

export default BurgerIngredientsItem;
