import SingupContent from '../../components/accounts/signup/SignupContents.jsx';
import ProcessErrorModal from '../../components/common/ProcessErrorModal.jsx';
import ProcessSuccessModal from '../../components/common/ProcessSuccessModal.jsx';
import { SIGNUP_SUCCESS_MESSAGES } from '../../constants/modal';
import { STEP, useSignupState } from '../../hooks/Accounts/useSignupState';

const TITLE = '회원가입';
const MODAL_TITLES = {
  ERROR: `${TITLE} 실패`,
  SUCCESS: `${TITLE} 성공`
};

const SignupPage = () => {
  const { state, handleStepChange, handleError, handleClose, handleChange, handleValidate, isButtonDisabled } =
    useSignupState();

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

  return (
    <SingupContent
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
