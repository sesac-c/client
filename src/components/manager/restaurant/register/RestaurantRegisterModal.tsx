import React, { useRef } from 'react';
import { Button, Modal, DialogTitle, DialogContent, Stack, Typography } from '@mui/joy';
import { RestaurantRegisterFormProps, RestaurantRegisterModalProps } from '@/types';
import DaumPost, { DaumPostRef } from './DaumPost';
import { addIcon } from '@/assets/icon';
import RegisterSelector from '@/components/manager/UI/register/RegisterSelector';
import RegisterFormField from '@/components/manager/UI/register/RegisterFormField';
import RegisterModalDialog from '@/components/manager/UI/register/RegisterModalDialog';
import RegisterButton from '@/components/manager/UI/register/RegisterButton';

const RestaurantRegisterForm: React.FC<RestaurantRegisterFormProps> = ({
  state,
  errors,
  onChange,
  onSubmit,
  isFormValid
}) => {
  const daumPostRef = useRef<DaumPostRef>(null);
  const groupTypeOptions = [
    { value: 'campus', label: '캠퍼스' },
    { value: 'runningmate', label: '러닝메이트' }
  ];

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      className='mt-5'
    >
      <Stack spacing={3} margin='dense'>
        <RegisterSelector
          title='유형 선택'
          value={state.type}
          options={groupTypeOptions}
          onChange={value => onChange('type', value)}
          error={errors.type}
        />
        <RegisterFormField name='name' label='식당 이름' value={state.name} onChange={onChange} error={errors.name} />
        <RegisterFormField
          name='category'
          label='카테고리'
          value={state.category}
          onChange={onChange}
          error={errors.category}
        />
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

const RestaurantRegisterModal: React.FC<RestaurantRegisterModalProps> = ({
  open,
  onOpen,
  onClose,
  state,
  errors,
  isFormValid,
  onChange,
  onSubmit
}) => {
  return (
    <React.Fragment>
      <Button onClick={onOpen} variant='outlined' color='neutral' startDecorator={addIcon} size='sm'>
        식당 등록
      </Button>
      <Modal open={open} onClose={onClose}>
        <RegisterModalDialog>
          <DialogTitle>식당 등록</DialogTitle>
          <DialogContent>
            <RestaurantRegisterForm
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

export default RestaurantRegisterModal;
