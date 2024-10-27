import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import Modal from '@/components/common/UI/Modal';
import Button from '@/components/common/UI/Button';
import { DEFAULT_PROCCESS_ERROR_MESSAGE } from '@/constants';
import { ProcessErrorModalProps } from '@/types';

const ProcessErrorModal: React.FC<ProcessErrorModalProps> = ({ title, content, footer, onClose }) => {
  const modalFooter = footer || (
    <Button size='large' onClick={onClose}>
      확인
    </Button>
  );

  return (
    <Modal title={title} footer={modalFooter} open={true} onClose={onClose}>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <ExclamationCircleIcon className='h-16 w-16 text-red-500' />
        <p className='text-center'>{content ? content : DEFAULT_PROCCESS_ERROR_MESSAGE}</p>
      </div>
    </Modal>
  );
};

export default ProcessErrorModal;
