import React from 'react';
import { Button, Modal, DialogTitle, DialogContent, Stack } from '@mui/joy';
import { RunningmateRegisterFormProps, RunningmateRegisterModalProps } from '../../../types';
import RegisterFormField from '../../common/UI/register/RegisterFormField';
import RegisterModalDialog from '../../common/UI/register/RegisterModalDialog';
import RegisterButton from '../../common/UI/register/RegisterButton';
import { addIcon } from '../../../assets/icon';
import CourseSelect from '../../common/UI/register/CourseSelect';

const RunningmateRegisterForm: React.FC<RunningmateRegisterFormProps> = ({
  state,
  errors,
  onChange,
  onSubmit,
  isFormValid
}) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      className='mt-5'
    >
      <Stack spacing={3} margin='dense'>
        <CourseSelect state={state} onChange={onChange} errors={errors} />
        <RegisterFormField
          name='name'
          label='러닝메이트 이름'
          value={state.name}
          onChange={onChange}
          error={errors.name}
        />
        <RegisterFormField
          name='subject'
          label='주제'
          value={state.subject}
          onChange={onChange}
          error={errors.subject}
        />
        <RegisterFormField name='goal' label='목표' value={state.goal} onChange={onChange} error={errors.goal} />
      </Stack>
      <RegisterButton isFormValid={isFormValid} />
    </form>
  );
};

const RunningmateRegisterModal: React.FC<RunningmateRegisterModalProps> = ({
  open,
  onOpen,
  onClose,
  state,
  errors,
  isFormValid,
  onChange,
  onSubmit
}) => {
  const modalTitle = '러닝메이트 등록';
  return (
    <React.Fragment>
      <Button onClick={onOpen} variant='outlined' color='neutral' startDecorator={addIcon} size='sm'>
        {modalTitle}
      </Button>
      <Modal open={open} onClose={onClose}>
        <RegisterModalDialog>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogContent>
            <RunningmateRegisterForm
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
export default RunningmateRegisterModal;
