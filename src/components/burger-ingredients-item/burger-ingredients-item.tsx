import React from 'react';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {Data} from '../../models/data';
import {useDispatch} from 'react-redux';
import {addCurrentItem, setModalType, toggleModalOpen} from '../../services/reducers/modal';
import {useDrag} from "react-dnd";
import styles from './burger-ingredients-item.module.css';

type Props = {
  ingredient: Data;
};

const BurgerIngredientsItem = ({ ingredient }: Props) => {
  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: {...ingredient},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const chooseCurrent = () => {
    dispatch(addCurrentItem(ingredient));
    dispatch(setModalType('ingredient'));
    dispatch(toggleModalOpen());
  };

  return (
    <section className={styles.wrapper} onClick={chooseCurrent} ref={dragRef} style={{opacity}}>
      <div className={`${styles.imageWrapper} pl-4 pr-4`}>
        <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
      </div>
      <div className={`${styles.priceWrapper} mt-1 mb-1`}>
        <span className={`${styles.price} text text_type_digits-default`}>{ingredient.price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
      {ingredient.count > 0 ?
        (<div className={styles.counterWrapper}>
          <Counter count={ingredient.count} size="default"/>
        </div>) : null}
    </section>
  );
};

export default BurgerIngredientsItem;
