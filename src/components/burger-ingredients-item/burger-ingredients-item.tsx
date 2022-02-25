import React, {useState} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients-item.module.css';

type Props = {
  name: string;
  price: number;
  image: string;
};

const BurgerIngredientsItem = ({ name, price, image }: Props) => {
  const [count, setCount] = useState(0);

  return (
    <section className={styles.wrapper}>
      <div className={`${styles.imageWrapper} pl-4 pr-4`}>
        <img className={styles.image} src={image} alt={name}/>
      </div>
      <div className={`${styles.priceWrapper} mt-1 mb-1`}>
        <span className={`${styles.price} text text_type_digits-default`}>{price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      {count > 0 &&
        (<div className={styles.counterWrapper}>
          <Counter count={count} size="default"/>
        </div>)}
    </section>
  );
};

export default BurgerIngredientsItem;
