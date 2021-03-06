import React, {useRef, useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { Data } from '../../models/data';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../services/reducers/burger-ingredients';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('bun');
  const ingredients: Data[] = useSelector(selectIngredients);

  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const onScroll = () => {
    const bun = Math.abs(containerRef.current!.getBoundingClientRect().top - bunRef.current!.getBoundingClientRect().top)
    const sauce = Math.abs(containerRef.current!.getBoundingClientRect().top - sauceRef.current!.getBoundingClientRect().top)
    const main = Math.abs(containerRef.current!.getBoundingClientRect().top - mainRef.current!.getBoundingClientRect().top)
    const min = Math.min(bun, sauce, main);
    const currentTab = min === bun ? 'bun' : min === sauce ? 'sauce' : 'main';
    setCurrent(currentTab);
  }

  const bunArr = ingredients.filter(item => item.type === 'bun');
  const sauceArr = ingredients.filter(item => item.type === 'sauce');
  const mainArr = ingredients.filter(item => item.type === 'main');

  if (ingredients.length) {
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
        <div className={styles.scrollContainer}  ref={containerRef} onScroll={onScroll}>
          <ul className={styles.list}>
            <li className='mb-10'>
              <h2 className='text text_type_main-medium' ref={bunRef}>Булки</h2>
              <ul className={`${styles.list} ${styles.innerList}`}>
                {bunArr.map(item => (
                  <li key={item._id}>
                    <BurgerIngredientsItem ingredient={item} />
                  </li>
                ))}
              </ul>
            </li>
            <li className='mb-10'>
              <h2 className='text text_type_main-medium' ref={sauceRef}>Соусы</h2>
              <ul className={`${styles.list} ${styles.innerList}`}>
                {sauceArr.map(item => (
                  <li key={item._id}>
                    <BurgerIngredientsItem ingredient={item} />
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <h2 className='text text_type_main-medium' ref={mainRef}>Начинки</h2>
              <ul className={`${styles.list} ${styles.innerList}`}>
                {mainArr.map(item => (
                  <li key={item._id}>
                    <BurgerIngredientsItem ingredient={item} />
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  return null;
};

export default BurgerIngredients;
