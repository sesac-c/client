import React, { useState } from 'react';
import RegisterModal from '../../common/UI/RegisterModal';
import { RegisterFormItem, RegisterInstanceModalProps } from '../../../types';
import { Button, FormControl } from '@mui/joy';
import RegisterInput from '../../common/UI/RegisterInput';
import DaumPost from '../../common/DaumPost';

const form = [
  {
    label: '식당 이름',
    name: 'name'
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

const RestaurantRegisterForm: React.FC<{
  address: string;
  setAddress: (address: string) => void;
}> = ({ address, setAddress }) => {
  const renderInputs = (item: RegisterFormItem) => {
    return (
      <FormControl key={item.name}>
        <RegisterInput required name={item.name} placeholder={item.label} size='md' fullWidth variant='plain' />
      </FormControl>
    );
  };

  return (
    <div>
      {form.map(renderInputs)}
      <DaumPost value={address} setFuc={setAddress} />
    </div>
  );
};
const RestaurantRegisterModal: React.FC<RegisterInstanceModalProps> = ({ handleClick }) => {
  const [address, setAddress] = useState('');
  return (
    <RegisterModal
      registerButtonText='식당 등록'
      dialog={{
        title: '식당 등록'
      }}
      submit={{
        handleClick: handleClick,
        form: React.createElement(RestaurantRegisterForm, {
          address: address,
          setAddress: setAddress
        })
      }}
    />
  );
};
export default RestaurantRegisterModal;
