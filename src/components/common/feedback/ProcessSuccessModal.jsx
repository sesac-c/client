import PropTypes from 'prop-types';

import Modal from '../UI/Modal.jsx';
import Button from '../UI/Button.jsx';

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
