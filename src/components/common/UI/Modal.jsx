import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ modalType = 'generalmodal', title, footer, onClose, children }) => {
  return createPortal(
    <div className='modal-overlay'>
      <div className={modalType}>
        <div className='modal-header'>
          <h2>{title}</h2>
          {onClose && (
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

export default Modal;
