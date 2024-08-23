import PropTypes from 'prop-types';

import { STEP } from '../../../hooks/accounts/useSignupState';
import { useConfirmClose } from '../../../hooks/useConfirmClose';

import Button from '../../common/UI/Button';
import Modal from '../../common/UI/Modal';
import Stepper from '../../common/UI/Stepper.jsx';

import SignupFirstStepField from './SignupFirstStepField.jsx';
import SignupSecondStepField from './SignupSecondStepField.jsx';

import { PAGE_MODAL, SIGNUP_CONFIRM_MESSAGE } from '../../../constants';

// Constants
const steps = ['개인정보 입력', '새싹정보 입력', '회원가입 완료'];
const BUTTON_SIZE = 'large';
export const TITLE = '회원가입';

const SignupStepButton = ({ currentStep, onPrevious, onValidate, isDisabled }) => {
  if (currentStep === STEP.FIRST) {
    return (
      <Button size={BUTTON_SIZE} onClick={() => onValidate(STEP.SECOND)} disabled={isDisabled}>
        다음
      </Button>
    );
  }
  return (
    <div className='signup__button-container'>
      <Button size={BUTTON_SIZE} variant='tertiary' onClick={onPrevious}>
        이전
      </Button>
      <Button size={BUTTON_SIZE} onClick={() => onValidate(STEP.SUCCESS)} disabled={isDisabled}>
        가입
      </Button>
    </div>
  );
};

SignupStepButton.propTypes = {
  currentStep: PropTypes.oneOf(Object.values(STEP)).isRequired,
  onPrevious: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

const SingupContent = ({
  currentStep,
  formData,
  errors,
  onChange,
  onValidate,
  onStepChange,
  onClose,
  isButtonDisabled
}) => {
  const content =
    currentStep === STEP.FIRST ? (
      <SignupFirstStepField formData={formData} onChange={onChange} errors={errors} />
    ) : (
      <SignupSecondStepField formData={formData} onChange={onChange} errors={errors} />
    );

  return (
    <Modal
      modalType={PAGE_MODAL}
      title={TITLE}
      footer={
        <SignupStepButton
          currentStep={currentStep}
          onPrevious={() => onStepChange(STEP.FIRST)}
          onValidate={onValidate}
          isDisabled={isButtonDisabled}
        />
      }
      onBeforeClose={useConfirmClose(SIGNUP_CONFIRM_MESSAGE)}
      onClose={onClose}
      hasCloseButton={true}
    >
      <form className='modal-form'>
        <>
          <Stepper steps={steps} activeStep={currentStep === STEP.FIRST ? 0 : 1} />
          {content}
        </>
      </form>
    </Modal>
  );
};

SingupContent.propTypes = {
  currentStep: PropTypes.oneOf([STEP.FIRST, STEP.SECOND]).isRequired,
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onStepChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired
};

export default SingupContent;
