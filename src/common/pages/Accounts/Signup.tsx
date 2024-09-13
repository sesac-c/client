import React from 'react';
import { useSignupState } from '../../hooks/accounts/useSignupState';
import { SignupStep } from '../../types';
import ProcessErrorModal from '../../components/common/feedback/ProcessErrorModal';
import ProcessSuccessModal from '../../components/common/feedback/ProcessSuccessModal';
import SignupContents from '../../components/accounts/signup/SignupContents';
import { SIGNUP_SUCCESS_MESSAGES } from '../../constants';

const TITLE = '회원가입';
const MODAL_TITLES = {
  ERROR: `${TITLE} 실패`,
  SUCCESS: `${TITLE} 성공`
};

const SignupPage: React.FC = () => {
  const { state, handleStepChange, handleError, handleClose, handleChange, handleValidate, isButtonDisabled } =
    useSignupState();

  if (state.isError) {
    return <ProcessErrorModal title={MODAL_TITLES.ERROR} onClose={handleClose} />;
  }

  if (state.currentStep === SignupStep.SUCCESS) {
    return (
      <ProcessSuccessModal title={MODAL_TITLES.SUCCESS} onClose={handleClose}>
        {SIGNUP_SUCCESS_MESSAGES.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </ProcessSuccessModal>
    );
  }

  return (
    <SignupContents
      title={TITLE}
      currentStep={state.currentStep}
      formData={state.formData}
      errors={state.errors}
      onChange={handleChange}
      onValidate={handleValidate}
      onStepChange={handleStepChange}
      onError={handleError}
      onClose={handleClose}
      isButtonDisabled={isButtonDisabled()}
    />
  );
};

export default SignupPage;
