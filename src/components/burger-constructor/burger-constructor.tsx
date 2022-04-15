import React, {useMemo} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useDispatch, useSelector} from 'react-redux';
import {addBun, addFilling, removeFilling, selectConstructorItems} from '../../services/reducers/burger-constructor';
import {setOrderNumber} from '../../services/reducers/modal';
import styles from './burger-constructor.module.css';
import {useDrop} from 'react-dnd';
import {v4 as uuidv4} from 'uuid';
import {Data} from "../../models/data";
import {decreaseCount, increaseCount} from "../../services/reducers/burger-ingredients";

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

  const removeIngredient = (item: Data) => {
    dispatch(removeFilling(item));
    dispatch(decreaseCount(item));

  }

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
        <ul className={styles.list}>
          {burgerFilling.map((item) => (
            <li key={item.uuid} className={`${styles.item} mb-4`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                thumbnail={item.image}
                price={item.price}
                handleClose={() => removeIngredient(item)}
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
