import PropTypes from 'prop-types';
import Modal from './UI/Modal.jsx';
import Button from './UI/Button.jsx';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { DEFAULT_PROCCESS_ERROR_MESSAGE } from '../../constants/modal.js';

const ProcessErrorModal = ({ title, footer, onClose }) => {
  const modalFooter = footer || (
    <Button size='large' onClick={onClose}>
      확인
    </Button>
  );

  return (
    <Modal title={title} footer={modalFooter} open={true}>
      <div className='flex h-32 w-full flex-col items-center justify-between'>
        <ExclamationCircleIcon className='h-20 w-20 text-yellow-300' />
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
