import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { AccountInfoResponse } from '@/types';
import { useNavigate } from 'react-router-dom';
import { USER_SETTING_CHILDREN_PATH, USER_SETTING_PATH } from '@/routes/paths';

const form: { [K in keyof Omit<AccountInfoResponse, 'id'>]: string } = {
  name: '이름',
  birthdate: '생일',
  campusName: '소속 캠퍼스',
  email: '이메일'
};

const AccountInfoForm: React.FC<AccountInfoResponse> = props => {
  const navigate = useNavigate();
  const DEFAULT_TEXTFIELD_SETTING = {
    color: 'success' as const,
    margin: 'dense' as const,
    disabled: true,
    fullWidth: true,
    variant: 'filled' as const
  };

  return (
    <Stack spacing={3}>
      {(Object.keys(form) as Array<keyof typeof form>).map(
        field =>
          props[field] !== undefined && (
            <TextField
              key={field}
              name={field}
              label={form[field]}
              value={props[field]}
              {...DEFAULT_TEXTFIELD_SETTING}
            />
          )
      )}
      <Button
        variant='text'
        color='error'
        className='w-fit p-2'
        onClick={() => {
          navigate(`${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.accountDeletion}`);
        }}
      >
        회원탈퇴
      </Button>
    </Stack>
  );
};

export default AccountInfoForm;
