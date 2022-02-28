import React from 'react';
import styles from './modal-overlay.module.css';

type Props = {
  onClose: () => void;
}

const ModalOverlay = ({ onClose }: Props) => (
  <div className={styles.overlay} onClick={onClose} />
);

export default ModalOverlay;
