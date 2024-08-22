import { Link } from 'react-router-dom';

import { TextField } from '@mui/material';

import Division from '../../components/common/UI/Division.jsx';
import Logo from '../../components/common/layout/Logo.jsx';
import Button from '../../components/common/UI/Button.jsx';

import { SIGNUP_PATH, FIND_PASSWORD_PATH } from '../../constants/index';
import { DEFAULT_TEXTFIELD_SETTING, USERNAME_FIELD_SETTING, PASSWORD_LOGIN_FIELD_SETTING } from '../../utils/form.js';

const LoginForm = () => {
  return (
    <form method='post' className='login__form-container'>
      <div className='login__logo-container'>
        <Logo />
      </div>
      <div className='login__form-details'>
        <div className='login__input-fields'>
          <TextField {...DEFAULT_TEXTFIELD_SETTING} {...USERNAME_FIELD_SETTING} />
          <TextField {...DEFAULT_TEXTFIELD_SETTING} {...PASSWORD_LOGIN_FIELD_SETTING} />
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
          <Button size='large'>로그인</Button>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
