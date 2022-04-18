import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Data } from '../../models/data';
import { removeFilling } from '../../services/reducers/burger-constructor';
import { decreaseCount } from '../../services/reducers/burger-ingredients';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import styles from './burger-constructor-item.module.css'

type Props = {
  id?: string;
  item: Data;
  moveCard: (id: string | undefined, to: number) => void
  findCard: (id: string | undefined) => { index: number }
};

const BurgerConstructorItem = ({ item, id, moveCard, findCard }: Props) => {
  const { name, image, price } = item;
  const dispatch = useDispatch();

  const removeIngredient = (item: Data) => {
    dispatch(removeFilling(item));
    dispatch(decreaseCount(item));
  };

  const originalIndex = findCard(id).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'component',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveCard(droppedId, originalIndex)
        }
      },
    }),
    [id, originalIndex, moveCard],
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'component',
      hover({ id: draggedId }: any) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id)
          moveCard(draggedId, overIndex)
        }
      },
    }),
    [findCard, moveCard],
  )

  const opacity = isDragging ? 0 : 1

  return (
    <div className={`${styles.item} mb-4`} style={{opacity}} ref={(node) => drag(drop(node))}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        thumbnail={image}
        price={price}
        handleClose={() => removeIngredient(item)}
      />
    </div>
  );
};

export default BurgerConstructorItem;
