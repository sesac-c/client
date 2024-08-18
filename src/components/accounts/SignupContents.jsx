import PropTypes from 'prop-types';
import Input from '../../components/common/UI/Input.jsx';
import SelectBox from '../../components/common/UI/SelectBox.jsx';
import Button from '../../components/common/UI/Button.jsx';
import { useNavigateHandler } from '../../hooks/useNavigateHandler.js';
import Modal from '../common/UI/Modal.jsx';
import { PAGE_MODAL } from '../../constants/modal.js';
import { STEP } from '../../hooks/Accounts/useSignupState.js';

// Constants
const INPUT_SIZE = 'small';
const BUTTON_SIZE = 'large';
export const TITLE = '회원가입';

// Utility Components
const BirthdateInput = () => {
  const inputBaseClasses = 'p-2 border border-gray-inputBorder bg-gray-input rounded-md';
  return (
    <div className='w-full'>
      <label className='mb-1 block text-sm font-medium text-gray-basic'>생년월일 / 주민번호 앞 1자리</label>
      <div className='flex items-center'>
        <input type='text' className={`flex-grow ${inputBaseClasses}`} placeholder='YYMMDD' />
        <span className='mx-2 text-3xl'>-</span>
        <input type='text' className={`w-12 ${inputBaseClasses}`} maxLength='1' />
        <div className='ml-2 flex'>
          {[...Array(6)].map((_, index) => (
            <span key={index} className='mx-0.5 h-2.5 w-2.5 rounded-full bg-gray-400'></span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Step Components
const SignupFirstStepField = () => (
  <div className='modal-form'>
    <div className='flex flex-col gap-2'>
      <Input type='text' name='name' label='이름' size={INPUT_SIZE} />
      <BirthdateInput />
    </div>
    <div className='flex flex-col gap-2'>
      <Input type='email' name='email' label='이메일' size={INPUT_SIZE} />
      <Input type='password' name='password' label='비밀번호' size={INPUT_SIZE} />
      <Input type='password' name='confirmPassword' label='비밀번호 확인' size={INPUT_SIZE} />
    </div>
  </div>
);

const SignupSecondStepField = () => (
  <div className='modal-form'>
    <SelectBox size={INPUT_SIZE} label='캠퍼스 선택' />
    <SelectBox size={INPUT_SIZE} label='과정 선택' />
  </div>
);

// Button Components
const SignupStepButton = ({ currentStep, onClick }) => {
  if (currentStep === STEP.FIRST) {
    return (
      <Button size={BUTTON_SIZE} onClick={() => onClick(STEP.SECOND)}>
        다음
      </Button>
    );
  }
  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Button size={BUTTON_SIZE} variant='tertiary' onClick={() => onClick(STEP.FIRST)}>
        이전
      </Button>
      <Button size={BUTTON_SIZE} onClick={() => onClick(STEP.SUCCESS)}>
        가입
      </Button>
    </div>
  );
};

SignupStepButton.propTypes = {
  currentStep: PropTypes.oneOf(Object.values(STEP)).isRequired,
  onClick: PropTypes.func.isRequired
};

// Main Component
const SignupModal = ({ currentStep, onClick }) => {
  const content = currentStep === STEP.FIRST ? <SignupFirstStepField /> : <SignupSecondStepField />;

  return (
    <Modal
      modalType={PAGE_MODAL}
      title={TITLE}
      footer={<SignupStepButton currentStep={currentStep} onClick={onClick} />}
      onClose={useNavigateHandler(-1)}
      hasCloseButton={true}
    >
      {content}
    </Modal>
  );
};

SignupModal.propTypes = {
  currentStep: PropTypes.oneOf([STEP.FIRST, STEP.SECOND]).isRequired,
  onClick: PropTypes.func.isRequired
};

export default SignupModal;
