import React, { useCallback, useEffect } from 'react';
import ReactDOM from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {removeCurrentItem, resetOrderNumber, selectModal} from "../../services/reducers/modal";
import { useDispatch, useSelector } from "react-redux";
import styles from './modal.module.css';
import {resetConstructor} from "../../services/reducers/burger-constructor";
import {resetCounts} from "../../services/reducers/burger-ingredients";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  header?: string;
}

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal = ({ children, onClose, header }: Props) => {
  const { currentItem, orderNumber } = useSelector(selectModal)
  const dispatch = useDispatch();

  const onKeyDown = useCallback((e: any) => {
    if ((currentItem || orderNumber) && e.key === 'Escape') {
      if (currentItem) {
        dispatch(removeCurrentItem());
      }

      if (orderNumber) {
        dispatch(resetOrderNumber());
        dispatch(resetConstructor());
        dispatch(resetCounts());
      }
    }
  }, [dispatch, currentItem, orderNumber]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [onKeyDown])

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} pl-10 pt-10 pr-10 pb-15`}>
        <div className={styles.header}>
          <h2 className='text text_type_main-large'>{header}</h2>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
