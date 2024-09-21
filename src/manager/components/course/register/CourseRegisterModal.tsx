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

const CourseRegisterForm: React.FC = () => {
  const renderInputs = (item: RegisterFormItem) => {
    return (
      <FormControl key={item.name}>
        <RegisterInput required name={item.name} placeholder={item.label} size='md' fullWidth variant='plain' />
      </FormControl>
    );
  };

  return <div>{form.map(renderInputs)}</div>;
};
const CourseRegisterModal: React.FC<RegisterInstanceModalProps> = ({ handleClick }) => {
  return (
    <RegisterModal
      registerButtonText='강의 등록'
      dialog={{
        title: '강의 등록'
      }}
      submit={{
        handleClick: handleClick,
        form: React.createElement(CourseRegisterForm)
      }}
    />
  );
};
export default CourseRegisterModal;
