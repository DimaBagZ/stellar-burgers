import { FC, memo } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(
  ({ title, onClose, children, isOrder, isIngredient }) =>
    ReactDOM.createPortal(
      <ModalUI
        title={title}
        onClose={onClose}
        isOrder={isOrder}
        isIngredient={isIngredient}
      >
        {children}
      </ModalUI>,
      modalRoot as HTMLDivElement
    )
);
