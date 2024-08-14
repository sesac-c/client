import { memo, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { MODAL_TYPE_ARR, GENERAL_MODAL, PAGE_MODAL, WRITE_MODAL } from '../../../constants/modal';

const Modal = ({ modalType = GENERAL_MODAL, title, footer, onClose, children, open }) => {
  const hasCloseButton = useMemo(() => modalType === PAGE_MODAL || modalType === WRITE_MODAL, [modalType]);

  const handleOverlayClick = useCallback(
    e => {
      if (!hasCloseButton && e.target === e.currentTarget) {
        onClose();
      }
    },
    [hasCloseButton, onClose]
  );

  if (!(modalType === PAGE_MODAL) && !open) return null;

  return createPortal(
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className={modalType}>
        <div className='modal-header'>
          <h2>{title}</h2>
          {hasCloseButton && onClose && (
            <button onClick={onClose} className='close-button'>
              <XMarkIcon className='h-8 w-8' />
            </button>
          )}
        </div>
        <div className='modal-content'>{children}</div>
        <div className='modal-footer'>{footer}</div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

Modal.propTypes = {
  modalType: PropTypes.oneOf(MODAL_TYPE_ARR),
  title: PropTypes.string,
  footer: PropTypes.node,
  onClose: PropTypes.func,
  children: PropTypes.node,
  open: PropTypes.bool
};

export default memo(Modal);
