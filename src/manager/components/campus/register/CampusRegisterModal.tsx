import React, { useRef } from 'react';
import { Button, Modal, DialogTitle, DialogContent, Stack, Typography } from '@mui/joy';
import { CampusRegisterFormProps, CampusRegisterModalProps } from '../../../types';
import RegisterFormField from '../../common/UI/register/RegisterFormField';
import RegisterModalDialog from '../../common/UI/register/RegisterModalDialog';
import RegisterButton from '../../common/UI/register/RegisterButton';
import DaumPost, { DaumPostRef } from '../../common/DaumPost';
import { addIcon } from '../../../assets/icon';

const CampusRegisterForm: React.FC<CampusRegisterFormProps> = ({ state, errors, onChange, onSubmit, isFormValid }) => {
  const daumPostRef = useRef<DaumPostRef>(null);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      className='mt-5'
    >
      <Stack spacing={3} margin='dense'>
        <RegisterFormField name='name' label='캠퍼스 이름' value={state.name} onChange={onChange} error={errors.name} />

        <DaumPost ref={daumPostRef} value={state.address} setFuc={value => onChange('address', value)} />
        {errors.address && (
          <Typography color='danger' level='body-xs'>
            {errors.address}
          </Typography>
        )}
      </Stack>
      <RegisterButton isFormValid={isFormValid} />
    </form>
  );
};
const CampusRegisterModal: React.FC<CampusRegisterModalProps> = ({
  open,
  onOpen,
  onClose,
  state,
  errors,
  isFormValid,
  onChange,
  onSubmit
}) => {
  const modalTitle = '캠퍼스 등록';
  return (
    <React.Fragment>
      <Button onClick={onOpen} variant='outlined' color='neutral' startDecorator={addIcon} size='sm'>
        {modalTitle}
      </Button>
      <Modal open={open} onClose={onClose}>
        <RegisterModalDialog>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogContent>
            <CampusRegisterForm
              state={state}
              errors={errors}
              onSubmit={onSubmit}
              onChange={onChange}
              isFormValid={isFormValid}
            />
          </DialogContent>
        </RegisterModalDialog>
      </Modal>
    </React.Fragment>
  );
};
export default CampusRegisterModal;
