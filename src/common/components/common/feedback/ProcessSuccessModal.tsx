import React from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { ProcessSuccessModalProps } from '../../../types';

const ProcessSuccessModal: React.FC<ProcessSuccessModalProps> = ({ title, footer, onClose, children }) => {
  const modalFooter = footer || (
    <Button size='large' onClick={onClose}>
      확인
    </Button>
  );

  return (
    <Modal title={title} footer={modalFooter} onClose={onClose} open={true}>
      <div className='text-center'>{children}</div>
    </Modal>
  );
};

export default ProcessSuccessModal;
