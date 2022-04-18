import React, {useCallback, useMemo} from 'react';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch, useSelector} from 'react-redux';
import {addBun, addFilling, selectConstructorItems, updateFillings} from '../../services/reducers/burger-constructor';
import {setOrderNumber} from '../../services/reducers/modal';
import {useDrop} from 'react-dnd';
import {v4 as uuidv4} from 'uuid';
import {Data} from "../../models/data";
import {increaseCount, updateBunCount} from "../../services/reducers/burger-ingredients";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import update from 'immutability-helper';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const { burgerBun, burgerFilling } = useSelector(selectConstructorItems);
  const dispatch = useDispatch();

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop: (item: Data)  => {
      item.uuid = uuidv4();
      if (item.type === 'bun') {
        dispatch(addBun(item));
        dispatch(updateBunCount(item));
      } else  {
        dispatch(addFilling(item));
        dispatch(increaseCount(item));
      }
    }
  });

  const totalPrice = useMemo(() => {
    const bunPrice = burgerBun ? burgerBun.price * 2 : 0;
    const fillingPrice = burgerFilling.length && burgerFilling.reduce((prev, curr) => {
      return prev + curr.price
    } ,0)
    return bunPrice + fillingPrice
  }, [burgerBun, burgerFilling]);

  const onButtonClick = async () => {
    if (burgerBun && burgerFilling) {
      dispatch(setOrderNumber([burgerBun._id, ...burgerFilling.map(item => item._id)]))
    }
  };

  const findCard = useCallback(
    (id: string | undefined) => {
      const constructorItem = burgerFilling.filter((item) => item.uuid === id)[0];
      return {
        constructorItem,
        index: burgerFilling.indexOf(constructorItem),
      }
    },
    [burgerFilling],
  )

  const moveCard = useCallback(
    (id: string | undefined, atIndex: number) => {
      const { constructorItem, index } = findCard(id)
      const newBurgerFilling = update(burgerFilling, {
        $splice: [
          [index, 1],
          [atIndex, 0, constructorItem],
        ],
      });
      dispatch(updateFillings(newBurgerFilling));
    },
    [findCard, burgerFilling, dispatch],
  )

  const [, drop] = useDrop(() => ({ accept: 'component' }))

  return (
    <section className={`${styles.container} ${isHover ? styles.onHover : ''} pt-25`} ref={dropTargetRef}>
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
        <div className={styles.fillingsWrapper} ref={drop}>
          {burgerFilling.map((item) => (
            <BurgerConstructorItem
              key={item.uuid}
              id={item.uuid}
              item={item}
              moveCard={moveCard}
              findCard={findCard}
            />
          ))}
        </div>
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
      {totalPrice > 0 && <div className={`${styles.orderWrapper} mt-10`}>
        <div className={styles.total}>
          <span className='text text_type_digits-medium'>{totalPrice}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <Button type="primary" size="large" onClick={onButtonClick}>
          Оформить заказ
        </Button>
      </div>}
    </section>
  );
};

export default BurgerConstructor;
