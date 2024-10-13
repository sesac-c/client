import React, { ChangeEvent } from 'react';
import { Container, Box, Typography, Button, Stack, Divider } from '@mui/material';
import {
  ResetPasswordLayoutProps,
  ResetPasswordField,
  ResetPasswordState,
  ResetPasswordFormProps,
  ResetPasswordFieldsProps
} from '@/common/types';
import Logo from '../../common/layout/Logo';
import { LOGIN_PATH } from '@/common/constants';
import PasswordInput from '../signup/PasswordInput';
import { CONFIRMPASSWORD_FIELD_SETTING, PASSWORD_FIELD_SETTING } from '@/common/utils';

const ResetPasswordLayout: React.FC<ResetPasswordLayoutProps> = ({ title, children, onSubmit, isButtonDisabled }) => {
  return (
    <Container maxWidth='md'>
      <Box sx={{ p: 5, pt: 8, minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h5' fontWeight={650} component='h1' gutterBottom>
          {title}
        </Typography>
        <Divider />
        <Box
          component='form'
          noValidate
          sx={{
            mt: 2,
            p: 2,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <Stack spacing={3} sx={{ flexGrow: 1 }}>
            {children}
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 'auto'
          }}
        >
          <Button
            disabled={isButtonDisabled}
            size='large'
            type='button'
            onClick={onSubmit}
            variant='contained'
            sx={{
              width: '40%',
              bgcolor: '#187b46',
              color: 'white',
              '&:hover': {
                bgcolor: '#165132'
              }
            }}
          >
            확인
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export const Header: React.FC = () => {
  return (
    <header className='header-container'>
      <div className='header-inner'>
        <div className='feed-menu-area'>
          <div className='logo'>
            <span>
              <Logo size='full' to={LOGIN_PATH} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

const ResetPasswordFields: React.FC<ResetPasswordFieldsProps> = ({ state, onChange }) => {
  return (
    <React.Fragment>
      <PasswordInput
        id='password'
        label='비밀번호'
        placeholder='비밀번호를 입력하세요'
        value={state.password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('password', e.target.value)}
        error={!!state.errors.password}
        helperText={state.errors.password || ''}
        {...PASSWORD_FIELD_SETTING}
      />
      <PasswordInput
        id='confirmPassword'
        label='비밀번호 확인'
        placeholder='비밀번호를 재입력하세요'
        value={state.confirmPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('confirmPassword', e.target.value)}
        error={!!state.errors.confirmPassword}
        helperText={state.errors.confirmPassword || ''}
        {...CONFIRMPASSWORD_FIELD_SETTING}
      />
    </React.Fragment>
  );
};

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  state,
  onSubmit,
  onChange,
  isButtonDisabled
}) => {
  return (
    <ResetPasswordLayout title='비밀번호 재설정' onSubmit={onSubmit} isButtonDisabled={isButtonDisabled()}>
      <ResetPasswordFields state={state} onChange={onChange} />
    </ResetPasswordLayout>
  );
};
