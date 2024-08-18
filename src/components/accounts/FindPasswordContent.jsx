import LabeledWrapper from '../common/UI/LabeledWrapper.jsx';
import { FIND_PASSWORD_PROCESS_STATUS } from '../../hooks/Accounts/useFindPasswordState.js';
import Input from '../common/UI/Input.jsx';

const INPUT_SIZE = 'small';
const EmailInputField = ({ isSendVerificationCode }) => {
  return (
    <LabeledWrapper title='이메일 인증'>
      <Input
        size={INPUT_SIZE}
        placeholder='이메일'
        name='email'
        type='email'
        disabled={isSendVerificationCode}
        inputMessage={isSendVerificationCode ? '인증코드가 발송되었습니다!' : ''}
        inputMessageType={isSendVerificationCode ? 'success' : ''}
      />
    </LabeledWrapper>
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
    <LabeledWrapper title='인증코드 입력' ExtraInfoElement={remainTime}>
      <Input size={INPUT_SIZE} placeholder='인증코드' name='' type='text' />
    </LabeledWrapper>
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
