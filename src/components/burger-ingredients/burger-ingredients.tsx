import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import {Data} from "../../models/data";
import styles from './burger-ingredients.module.css';

type Props = {
  data: Data[];
  chooseCurrent: (ingredient: Data | null, modalType: string) => void;
}

const BurgerIngredients = ({ data, chooseCurrent }: Props) => {
  const [current, setCurrent] = useState('bun');

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} pt-10 pb-5 text text_type_main-large`}>Соберите бургер</h1>
      <div style={{ display: 'flex' }} className='mb-10'>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.scrollContainer}>
        <ul className={styles.list}>
          <li className='mb-10'>
            <h2 className='text text_type_main-medium'>Булки</h2>
            <ul className={`${styles.list} ${styles.innerList}`}>
              {data.filter(item => item.type === 'bun').map(item => (
                <li key={item.name} onClick={() => chooseCurrent(item, 'ingredient')}>
                  <BurgerIngredientsItem name={item.name} price={item.price} image={item.image} />
                </li>
              ))}
            </ul>
          </li>
          <li className='mb-10'>
            <h2 className='text text_type_main-medium'>Соусы</h2>
            <ul className={`${styles.list} ${styles.innerList}`}>
              {data.filter(item => item.type === 'sauce').map(item => (
                <li key={item.name} onClick={() => chooseCurrent(item, 'ingredient')}>
                  <BurgerIngredientsItem name={item.name} price={item.price} image={item.image} />
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h2 className='text text_type_main-medium'>Начинки</h2>
            <ul className={`${styles.list} ${styles.innerList}`}>
              {data.filter(item => item.type === 'main').map(item => (
                <li key={item.name} onClick={() => chooseCurrent(item, 'ingredient')}>
                  <BurgerIngredientsItem name={item.name} price={item.price} image={item.image} />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
