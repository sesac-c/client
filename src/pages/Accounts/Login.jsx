import MascotImage from '../../components/common/MascotImage.jsx';
import LoginForm from '../../components/accounts/LoginForm.jsx';

const LoginPage = () => {
  const loginMascotSize = 'w-3/12 h-[30rem]';
  const loginFormSize = 'w-2/5 h-[35rem]';
  return (
    <div className='container flex h-full w-full flex-row items-center justify-center'>
      <div className={`${loginMascotSize} hidden xl:flex xl:justify-end`}>
        <MascotImage type='login' />
      </div>
      <div className={`${loginFormSize} flex items-center justify-center`}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
