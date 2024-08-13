import PropTypes from 'prop-types';

import Button from './UI/Button.jsx';
import Modal from './UI/Modal.jsx';

const ProcessSuccessModal = ({ children, ...modalProps }) => {
  const { title, footer, onClose } = modalProps;

  const modalFooter = footer || (
    <Button size='large' onClick={onClose}>
      확인
    </Button>
  );

  return (
    <Modal title={title} footer={modalFooter} onClose={onClose} open={true}>
      <div className='modal-text'>{children}</div>
    </Modal>
  );
};

ProcessSuccessModal.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default ProcessSuccessModal;
