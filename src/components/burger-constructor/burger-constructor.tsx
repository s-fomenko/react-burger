import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {Data} from '../../models/data';
import styles from './burger-constructor.module.css';
import {IngredientsContext} from "../../context/ingriedientsContext";

type Props = {
  showTotal: (ingredient: Data | null, modalType: string) => void;
  onOrderRequest: Dispatch<SetStateAction<number>>;
}

const BurgerConstructor = ({ showTotal, onOrderRequest }: Props) => {
  const ingredients: Data[] = useContext(IngredientsContext);
  const [burgerBun, setBurgerBun] = useState<Data | null>(null);
  const [burgerFilling, setBurgerFilling] = useState<Data[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (ingredients.length) {
      setBurgerBun(ingredients[0]);
      setBurgerFilling(ingredients.filter(item => item.type !== 'bun'));
    }
  }, [ingredients])

  useEffect(() => {
    const bunPrice = burgerBun ? burgerBun.price * 2 : 0;
    const fillingPrice = burgerFilling.length && burgerFilling.reduce((prev, curr) => {
      return prev + curr.price
    } ,0)

    setTotalPrice(bunPrice + fillingPrice);
  }, [burgerBun, burgerFilling])

  const onButtonClick = () => {
    const apiUrl = 'https://norma.nomoreparties.space/api/orders';

    const postOrder = async () => {
      if (burgerBun && burgerFilling) {
        try {
          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"ingredients": [burgerBun._id, ...burgerFilling.map(item => item._id)]})
          });
          if (!res.ok) {
            throw new Error('Ответ сети был не ok.');
          }
          const data = await res.json();
          onOrderRequest(data.order.number);
        } catch (e) {
          console.log(`Error: ${e}`)
        }
      }
    };
    postOrder();
    showTotal(null, 'total')
  };

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
          {burgerFilling.map((item, index) => (
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
          <span className='text text_type_digits-medium'>{totalPrice}</span>
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
