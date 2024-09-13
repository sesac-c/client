import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

import Division from '../../components/common/UI/Division';
import Logo from '../../components/common/layout/Logo';
import Button from '../../components/common/UI/Button';

import { SIGNUP_PATH, FIND_PASSWORD_PATH } from '../../constants';
import { DEFAULT_TEXTFIELD_SETTING, USERNAME_FIELD_SETTING, PASSWORD_LOGIN_FIELD_SETTING } from '../../utils/form.js';
import useAuthStore from '../../stores/authStore.js';
import { getRedirectPath } from '../../utils/auth.js';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const loginResult = await login(email, password);
      if (!loginResult.success) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      }
      // role에 맞는 경로로 이동
      navigate(getRedirectPath(loginResult.user.role, logout), { replace: true });
      return;
    } catch (error) {
      console.error('Login error:', error);
      setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='login__form-container'>
      <div className='login__logo-container'>
        <Logo />
      </div>
      <div className='login__form-details'>
        <div className='login__input-fields'>
          <TextField
            {...DEFAULT_TEXTFIELD_SETTING}
            {...USERNAME_FIELD_SETTING}
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!error}
          />
          <TextField
            {...DEFAULT_TEXTFIELD_SETTING}
            {...PASSWORD_LOGIN_FIELD_SETTING}
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </div>
        <div className='login__links-container'>
          <Link className='login__link' to={SIGNUP_PATH}>
            회원가입
          </Link>
          <Division />
          <Link className='login__link' to={FIND_PASSWORD_PATH}>
            비밀번호 찾기
          </Link>
        </div>
        <div className='login__button-container'>
          <Button type='submit' size='large'>
            로그인
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
