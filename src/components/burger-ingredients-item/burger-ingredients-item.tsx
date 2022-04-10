import React, {useState} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Data } from '../../models/data';
import styles from './burger-ingredients-item.module.css';
import { useDispatch } from 'react-redux';
import { addCurrentItem, setModalType, toggleModalOpen } from '../../services/reducers/modal';

type Props = {
  ingredient: Data;
};

const BurgerIngredientsItem = ({ ingredient }: Props) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const chooseCurrent = () => {
    dispatch(addCurrentItem(ingredient));
    dispatch(setModalType('ingredient'));
    dispatch(toggleModalOpen());
  };

  return (
    <section className={styles.wrapper} onClick={chooseCurrent}>
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
