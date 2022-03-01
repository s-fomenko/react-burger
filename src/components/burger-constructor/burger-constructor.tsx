import React from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {Data} from "../../models/data";
import styles from "./burger-constructor.module.css";

type Props = {
  data: Data[];
  showTotal: (ingredient: Data | null, modalType: string) => void;
}

const BurgerConstructor = ({ data, showTotal }: Props) => {
  const [lockedElement] = data;

  return (
    <section className={`${styles.container} pt-25`}>
      <div className={styles.blockedElement}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${lockedElement.name} (верх)`}
          thumbnail={lockedElement.image}
          price={lockedElement.price}
        />
      </div>
      <div className={`${styles.scrollContainer} pt-4 pb-4`}>
        <ul className={styles.list}>
          {data.filter(item => item.type !== 'bun').map((item, index) => (
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
      <div className={styles.blockedElement}>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${lockedElement.name} (низ)`}
          thumbnail={lockedElement.image}
          price={lockedElement.price}
        />
      </div>
      <div className={`${styles.orderWrapper} mt-10`}>
        <div className={styles.total}>
          <span className='text text_type_digits-medium'>610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={() => showTotal(null, 'total')}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
