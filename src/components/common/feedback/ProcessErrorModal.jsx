import PropTypes from 'prop-types';

import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

import Modal from '../UI/Modal.jsx';
import Button from '../UI/Button.jsx';

import { DEFAULT_PROCCESS_ERROR_MESSAGE } from '../../../constants/index';

const ProcessErrorModal = ({ title, footer, onClose }) => {
  const modalFooter = footer || (
    <Button size='large' onClick={onClose}>
      확인
    </Button>
  );

  return (
    <Modal title={title} footer={modalFooter} open={true}>
      <div className='process-error-container'>
        <ExclamationCircleIcon className='process-error__icon' />
        <p>{DEFAULT_PROCCESS_ERROR_MESSAGE}</p>
      </div>
    </Modal>
  );
};

ProcessErrorModal.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default ProcessErrorModal;
