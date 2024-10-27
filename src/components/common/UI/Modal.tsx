import React, { memo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ModalProps } from '@/types';
import { GENERAL_MODAL, PAGE_MODAL } from '@/constants';

const Modal: React.FC<ModalProps> = memo(
  ({ modalType = GENERAL_MODAL, title, footer, onClose, hasCloseButton = false, onBeforeClose, children, open }) => {
    const handleClose = useCallback(async () => {
      if (onBeforeClose) {
        const shouldClose = await onBeforeClose();
        if (shouldClose) {
          onClose?.();
        }
      } else {
        onClose?.();
      }
    }, [onBeforeClose, onClose]);

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!hasCloseButton && e.target === e.currentTarget) {
          handleClose();
        }
      },
      [hasCloseButton, handleClose]
    );

    if (modalType !== PAGE_MODAL && !open) return null;

    return createPortal(
      <div className='modal-overlay' onClick={handleOverlayClick}>
        <div className={`modal ${modalType}`}>
          <div className='modal-header'>
            <h2>{title}</h2>
            {hasCloseButton && onClose && (
              <button onClick={handleClose} className='close-button'>
                <XMarkIcon className='h-8 w-8' />
              </button>
            )}
          </div>
          <div className='modal-content'>{children}</div>
          <div className='modal-footer'>{footer}</div>
        </div>
      </div>,
      document.getElementById('modal')!
    );
  }
);

export default Modal;
