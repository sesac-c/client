import HeaderedInputText from '../common/UI/HeaderedInputText.jsx';
import { FIND_PASSWORD_PROCESS_STATUS } from '../../hooks/Accounts/useFindPasswordState.js';

const EmailInputField = ({ isSendVerificationCode }) => {
  return (
    <HeaderedInputText
      title='이메일 인증'
      placeholder='이메일'
      name='email'
      type='email'
      disabled={isSendVerificationCode}
      inputMessage={isSendVerificationCode ? '인증코드가 발송되었습니다!' : ''}
      inputMessageType={isSendVerificationCode ? 'success' : ''}
    />
  );
};

const VerificationCodeField = () => {
  const remainTime = () => (
    <div className='flex flex-row items-center gap-3 font-semibold text-red-danger'>
      <span className='inline-block text-[0.8rem]'>입력까지 남은 시간</span>
      <span className='extra-info red'>0:00</span>
    </div>
  );
  return (
    <HeaderedInputText title='인증코드 입력' placeholder='인증코드' name='' type='text' ExtraInfoElement={remainTime} />
  );
};

const FindPasswordContent = ({ currentStep }) => {
  const isSendVerificationCode = currentStep === FIND_PASSWORD_PROCESS_STATUS.CODE;
  return (
    <div className='modal-form'>
      <EmailInputField isSendVerificationCode={isSendVerificationCode} />
      {isSendVerificationCode && <VerificationCodeField />}
    </div>
  );
};

export default FindPasswordContent;
