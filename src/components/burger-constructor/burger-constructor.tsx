import React, {useContext, useEffect, useState} from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {Data} from '../../models/data';
import styles from './burger-constructor.module.css';
import {IngredientsContext} from "../../ingriedientsContext";

type Props = {
  showTotal: (ingredient: Data | null, modalType: string) => void;
}

const BurgerConstructor = ({ showTotal }: Props) => {
  const ingredients: Data[] = useContext(IngredientsContext);
  const [burgerBun, setBurgerBun] = useState<Data | null>(null);

  const onButtonClick = () => showTotal(null, 'total');

  useEffect(() => {
    if (ingredients.length) {
      setBurgerBun(ingredients[0]);
    }
  }, [ingredients])

  return (
    <section className={`${styles.container} pt-25`}>
      {burgerBun && <div className={styles.blockedElement}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${burgerBun.name} (верх)`}
          thumbnail={burgerBun.image}
          price={burgerBun.price}
        />
      </div>}
      <div className={`${styles.scrollContainer} pt-4 pb-4`}>
        <ul className={styles.list}>
          {ingredients.filter(item => item.type !== 'bun').map((item, index) => (
            <li key={index} className={`${styles.item} mb-4`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                thumbnail={item.image}
                price={item.price}
              />
            </li>
          ))}
        </ul>
      </div>
      {burgerBun && <div className={styles.blockedElement}>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${burgerBun.name} (низ)`}
          thumbnail={burgerBun.image}
          price={burgerBun.price}
        />
      </div>}
      <div className={`${styles.orderWrapper} mt-10`}>
        <div className={styles.total}>
          <span className='text text_type_digits-medium'>610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={onButtonClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
