import React from 'react';
import { Button, Modal, DialogTitle, DialogContent, Stack } from '@mui/joy';
import { CourseRegisterFormProps, CourseRegisterModalProps } from '@/types';
import RegisterFormField from '@/components/manager/UI/register/RegisterFormField';
import RegisterModalDialog from '@/components/manager/UI/register/RegisterModalDialog';
import RegisterButton from '@/components/manager/UI/register/RegisterButton';
import { addIcon } from '@/assets/icon';
import RegisterDateFormField from '@/components/manager/UI/register/RegisterDateFormField';

const CourseRegisterForm: React.FC<CourseRegisterFormProps> = ({ state, errors, onChange, onSubmit, isFormValid }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      className='mt-5'
    >
      <Stack spacing={3} margin='dense'>
        <RegisterDateFormField
          name='startDate'
          label='개강일'
          value={state.startDate}
          onChange={onChange}
          error={errors.startDate}
        />
        <RegisterDateFormField
          name='endDate'
          label='종강일'
          value={state.endDate}
          onChange={onChange}
          error={errors.endDate}
        />
        <RegisterFormField name='name' label='강의 이름' value={state.name} onChange={onChange} error={errors.name} />
        <RegisterFormField
          name='classNumber'
          label='강의 기수'
          value={String(state.classNumber)}
          onChange={onChange}
          error={errors.classNumber}
        />
        <RegisterFormField
          name='instructorName'
          label='강사명'
          value={state.instructorName}
          onChange={onChange}
          error={errors.instructorName}
        />
      </Stack>
      <RegisterButton isFormValid={isFormValid} />
    </form>
  );
};
const CourseRegisterModal: React.FC<CourseRegisterModalProps> = ({
  open,
  onOpen,
  onClose,
  state,
  errors,
  isFormValid,
  onChange,
  onSubmit
}) => {
  const modalTitle = '강의 등록';
  return (
    <React.Fragment>
      <Button onClick={onOpen} variant='outlined' color='neutral' startDecorator={addIcon} size='sm'>
        {modalTitle}
      </Button>
      <Modal open={open} onClose={onClose}>
        <RegisterModalDialog>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogContent>
            <CourseRegisterForm
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
export default CourseRegisterModal;
