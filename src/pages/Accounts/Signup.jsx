import SignupModal, { TITLE } from '../../components/Accounts/SignupContents.jsx';
import ProcessErrorModal from '../../components/common/ProcessErrorModal.jsx';
import ProcessSuccessModal from '../../components/common/ProcessSuccessModal.jsx';
import { SIGNUP_SUCCESS_MESSAGES } from '../../constants/modal.js';
import { STEP, useSignupState } from '../../hooks/Accounts/useSignupState.js';

const MODAL_TITLES = {
  ERROR: `${TITLE} 실패`,
  SUCCESS: `${TITLE} 성공`
};

const SignupPage = () => {
  const { state, handleStepChange, handleError, handleClose } = useSignupState();

  if (state.isError) {
    return <ProcessErrorModal title={MODAL_TITLES.ERROR} onClose={handleClose} />;
  }

  if (state.currentStep === STEP.SUCCESS) {
    return (
      <ProcessSuccessModal title={MODAL_TITLES.SUCCESS} onClose={handleClose}>
        {SIGNUP_SUCCESS_MESSAGES.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </ProcessSuccessModal>
    );
  }

  return <SignupModal currentStep={state.currentStep} onClick={handleStepChange} onError={handleError} />;
};

export default SignupPage;
