import Division from '../common/UI/Division.jsx';
import Logo from '../common/layout/Logo.jsx';
import Button from '../common/UI/Button.jsx';
import { SIGNUP_PATH, FIND_PASSWORD_PATH } from '../../constants/routes.js';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const formSize = 'w-5/6 h-full';
  const formDetailSize = 'w-full h-[65%]';

  return (
    <form method='post' className={`${formSize} flex flex-col items-center justify-center py-10`}>
      <div className='flex-grow-2 flex-basis-0 flex min-h-0 w-full flex-shrink-0 flex-col items-center'>
        <Logo />
      </div>
      <div className={`${formDetailSize} flex flex-col justify-center gap-4`}>
        <div className='flex min-h-0 w-full flex-col justify-start gap-3'>
          <TextField label='아이디' color='success' />
          <TextField label='비밀번호' color='success' />
        </div>
        <div className='flex h-fit flex-row items-center justify-end gap-2 py-2'>
          <Link className='text-primary underline' to={SIGNUP_PATH}>
            회원가입
          </Link>
          <Division />
          <Link className='text-primary underline' to={FIND_PASSWORD_PATH}>
            비밀번호 찾기
          </Link>
        </div>
        <div>
          <Button size='large'>로그인</Button>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
