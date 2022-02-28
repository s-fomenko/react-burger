import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  header?: number;
}

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal = ({ children, onClose, header }: Props) => {
  return ReactDOM.createPortal(
    <>
      <div className={`${styles.modal} pl-10 pt-10 pr-10 pb-15`}>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;
