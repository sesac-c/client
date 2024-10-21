import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { ConfirmModalProps } from '../../../types';
import { Stack } from '@mui/material';

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  confirmButtonText,
  onClick,
  title,
  children,
  footer,
  onClose
}) => {
  const modalFooter = footer || (
    <Stack spacing={2} direction='row'>
      <Button size='large' onClick={onClose} variant='tertiary'>
        취소
      </Button>
      <Button size='large' onClick={onClick}>
        {confirmButtonText ? confirmButtonText : '확인'}
      </Button>
    </Stack>
  );

  return (
    <Modal title={title} footer={modalFooter} open={true} onClose={onClose}>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <CheckBadgeIcon className='h-16 w-16 text-orange-200' />
        <p className='text-center'>{children}</p>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
