import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Data } from '../../models/data';
import { removeFilling } from '../../services/reducers/burger-constructor';
import { decreaseCount } from '../../services/reducers/burger-ingredients';
import { useDispatch } from 'react-redux';
import styles from './burger-constructor-item.module.css'

type Props = {
  item: Data;
};

const BurgerConstructorItem = ({ item }: Props) => {
  const { name, image, price } = item;
  const dispatch = useDispatch();

  const removeIngredient = (item: Data) => {
    dispatch(removeFilling(item));
    dispatch(decreaseCount(item));

  };

  return (
    <li className={`${styles.item} mb-4`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        thumbnail={image}
        price={price}
        handleClose={() => removeIngredient(item)}
      />
    </li>
  );
};

export default BurgerConstructorItem;
