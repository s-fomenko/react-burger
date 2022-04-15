import React from 'react';
import icon from '../../images/done.svg'
import {useSelector} from "react-redux";
import {selectModal} from "../../services/reducers/modal";
import styles from "./order-details.module.css";

const OrderDetails = () => {
  const { orderNumber } = useSelector(selectModal)

  return (
    <div className={styles.container}>
      <h2 className='text text_type_digits-large mb-8'>{orderNumber}</h2>
      <p className={`${styles.description} text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <img className={`${styles.icon} mb-15`} src={icon} alt="order total icon"/>
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;
