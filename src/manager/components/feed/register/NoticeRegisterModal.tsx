import React from 'react';
import RegisterModal from '../../common/UI/RegisterModal';
import { RegisterFormItem, RegisterInstanceModalProps } from '../../../types';
import { FormControl } from '@mui/joy';
import RegisterInput from '../../common/UI/RegisterInput';

const form = [
  {
    label: '식당 이름',
    name: 'name'
  },
  {
    label: '주소',
    name: 'address'
  },
  {
    label: '카테고리',
    name: 'category'
  },
  {
    label: '유형',
    name: 'type'
  }
];

const NoticeRegisterForm: React.FC = () => {
  const renderInputs = (item: RegisterFormItem) => {
    return (
      <FormControl key={item.name}>
        <RegisterInput required name={item.name} placeholder={item.label} size='md' fullWidth variant='plain' />
      </FormControl>
    );
  };

  return <div>{form.map(renderInputs)}</div>;
};
const NoticeRegisterModal: React.FC<
  RegisterInstanceModalProps & {
    type: string;
  }
> = ({ handleClick, type }) => {
  return (
    <RegisterModal
      registerButtonText={`${type} 공지 등록`}
      dialog={{
        title: `${type} 공지 등록`
      }}
      submit={{
        handleClick: handleClick,
        form: React.createElement(NoticeRegisterForm)
      }}
    />
  );
};
export default NoticeRegisterModal;
