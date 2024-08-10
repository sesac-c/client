import InputText from '../common/UI/InputText.jsx';
import TextButton from '../common/UI/TextButton.jsx';
import Division from '../common/UI/Division.jsx';
import Logo from '../common/layout/Logo.jsx';
import Button from '../common/UI/Button.jsx';
import { SIGNUP_PATH, FIND_PASSWORD_PATH } from '../../constants/routes.js';

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
          <InputText placeholder='아이디' />
          <InputText placeholder='비밀번호' />
        </div>
        <div className='flex h-fit flex-row items-center justify-end gap-2 py-2'>
          <TextButton to={SIGNUP_PATH} content='회원가입' />
          <Division />
          <TextButton to={FIND_PASSWORD_PATH} content='비밀번호 찾기' />
        </div>
        <div>
          <Button size='large'>로그인</Button>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
