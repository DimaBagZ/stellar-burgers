import { FC, memo, useEffect } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children, isOrder, isIngredient }) => {
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [onClose]);

    return (
      <>
        <div className={styles.modal} data-testid='modal'>
          <div
            className={`${styles.header} ${isIngredient ? styles.header_ingredient : ''}`}
          >
            <h2
              className={
                isOrder
                  ? 'text text_type_digits-default mb-10'
                  : `${styles.title} text text_type_main-large`
              }
            >
              {title}
            </h2>
            <button
              className={styles.button}
              type='button'
              data-testid='modal-close'
              onClick={onClose}
            >
              <CloseIcon type='primary' />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
        <ModalOverlayUI onClick={onClose} />
      </>
    );
  }
);
