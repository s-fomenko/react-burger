import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {Data} from "../../utils/data";
import styles from "./burger-constructor.module.css";

type Props = {
  data: Data[];
}

const BurgerConstructor = ({ data }: Props) => {
  const [lockedElement] = data;

  return (
    <section className={`${styles.container} pt-25`}>
      <div className='pl-8'>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={lockedElement.name}
          thumbnail={lockedElement.image}
          price={lockedElement.price}
        />
      </div>
      <div className={`${styles.scrollContainer} pt-4 pb-4`}>
        <ul className={styles.list}>
          {data.filter(item => item.type !== 'bun').map(item => (
            <li key={item.name} className={`${styles.item} mb-4`}>
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
      <div className='pl-8'>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={lockedElement.name}
          thumbnail={lockedElement.image}
          price={lockedElement.price}
        />
      </div>
    </section>
  );
};

export default BurgerConstructor;
