// RegisterButton.tsx
import React from 'react';
import { useState } from 'react';
import { confirmAction } from '../../../../common/utils';

import Button from '@mui/joy/Button';
import { addIcon } from '../../../assets/icon';
import Stack from '@mui/joy/Stack';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { RegisterFormProps, RegisterModalProps } from '../../../types';

const RegisterButton: React.FC<{
  buttonText: string;
  onClick: () => void;
}> = ({ buttonText, onClick }) => (
  <Button variant='outlined' color='neutral' startDecorator={addIcon} size='sm' onClick={onClick}>
    {buttonText}
  </Button>
);

const RegisterForm: React.FC<RegisterFormProps> = ({ form, handleClick: onSubmit, buttonText }) => (
  <form onSubmit={onSubmit}>
    <Stack spacing={3} margin='dense'>
      {form}
      <Button type='submit' color='success' sx={{ marginTop: '30px' }}>
        {buttonText}
      </Button>
    </Stack>
  </form>
);

export const modalDialogStyles = {
  width: '80%',
  maxWidth: '600px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

const RegisterModal: React.FC<RegisterModalProps> = ({ registerButtonText, submit, dialog }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = async () => {
    const confirm = await confirmAction('등록을 취소하시겠습니까?\n입력된 정보는 저장되지 않습니다.');
    if (confirm) setOpen(false);
  };

  const { form, buttonText: submitButtonText = '등록', handleClick } = submit;
  const { title, content } = dialog;

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    handleClick(); //등록처리
    handleClose();
  };

  return (
    <React.Fragment>
      {/* 모달 여는 버튼 */}
      <RegisterButton buttonText={registerButtonText} onClick={handleOpen} />

      {/* 모달 */}
      <Modal open={open} onClose={handleClose}>
        <ModalDialog sx={modalDialogStyles}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{content || ''}</DialogContent>
          <RegisterForm
            // modal inputs
            form={form}
            // submit button
            buttonText={submitButtonText}
            handleClick={handleSubmit}
          />
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default RegisterModal;
