import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const Modal = ({ modalType = 'generalmodal', title, footer, onClose, children, open }) => {
  const isPagemodal = modalType === 'pagemodal';
  if (!isPagemodal && !open) return null;

  return createPortal(
    <div className='modal-overlay' onClick={!isPagemodal ? onClose : null}>
      <div className={modalType}>
        <div className='modal-header'>
          <h2>{title}</h2>
          {isPagemodal ? (
            onClose ? (
              <button onClick={onClose} className='close-button'>
                <XMarkIcon className='h-8 w-8' />
              </button>
            ) : null
          ) : null}
        </div>
        <div className='modal-content'>{children}</div>
        <div className='modal-footer'>{footer}</div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

Modal.propTypes = {
  modalType: PropTypes.oneOf(['generalmodal', 'pagemodal']),
  title: PropTypes.string,
  footer: PropTypes.node,
  onClose: PropTypes.func,
  children: PropTypes.node,
  open: PropTypes.bool
};

export default Modal;
