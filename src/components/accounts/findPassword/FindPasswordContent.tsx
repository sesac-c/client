import React from 'react';
import { useConfirmClose } from '@/hooks';

import Modal from '../../common/UI/Modal';
import Button from '../../common/UI/Button';
import Stepper from '../../common/UI/Stepper';

import EmailInputField from './EmailInputField';
import VerificationCodeField from './VerificationCodeField';

import { PAGE_MODAL, FINDPASSWORD_CONFIRM_MESSAGE } from '@/constants';
import { FindPasswordContentProps, FindPasswordProcessStatus } from '@/types';
import { LOGIN_PATH } from '@/routes/paths';
import { useNavigate } from 'react-router-dom';
// Constants
const steps = ['이메일 인증', '인증번호 인증', '비밀번호 변경'];
const BUTTON_SIZE = 'large';
const FindPasswordContent: React.FC<FindPasswordContentProps> = ({
  title,
  state,
  handleChange,
  handleButtonClick,
  isButtonDisabled
}) => {
  const navigate = useNavigate();
  const buttonText = state.isTimerExpired
    ? '인증번호 재전송'
    : state.currentStep === FindPasswordProcessStatus.EMAIL
      ? '인증번호 발송'
      : '확인';
  const confirmClose = useConfirmClose(FINDPASSWORD_CONFIRM_MESSAGE);
  const navigateToLogin = () => {
    navigate(LOGIN_PATH);
  };

  const content = (
    <>
      <Stepper steps={steps} activeStep={state.currentStep === FindPasswordProcessStatus.EMAIL ? 0 : 1} />
      <EmailInputField
        email={state.email}
        isEmailValid={state.isEmailValid}
        helperText={state.emailHelperText}
        onChange={handleChange}
      />
      {state.currentStep === FindPasswordProcessStatus.CODE && (
        <VerificationCodeField
          verificationCode={state.verificationCode}
          remainingTime={state.remainingTime}
          onChange={handleChange}
          helperText={state.codeHelperText}
          isDisabled={state.isTimerExpired}
        />
      )}
    </>
  );

  return (
    <Modal
      modalType={PAGE_MODAL}
      title={title}
      footer={
        <Button size={BUTTON_SIZE} onClick={handleButtonClick} disabled={isButtonDisabled()}>
          {buttonText}
        </Button>
      }
      onBeforeClose={confirmClose}
      onClose={navigateToLogin}
      hasCloseButton={true}
    >
      <form className='modal-form'>{content}</form>
    </Modal>
  );
};

export default FindPasswordContent;
