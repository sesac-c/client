import React from 'react';
import { useConfirmClose } from '@/hooks';
import Button from '@/components/common/UI/Button';
import Modal from '@/components/common/UI/Modal';
import Stepper from '@/components/common/UI/Stepper';
import SignupFirstStepField from './SignupFirstStepField';
import SignupSecondStepField from './SignupSecondStepField';
import { PAGE_MODAL, SIGNUP_CONFIRM_MESSAGE } from '@/constants';
import { SignupStep, FormData } from '@/types';

const steps = ['개인정보 입력', '새싹정보 입력', '회원가입 완료'];
const BUTTON_SIZE = 'large';

interface SignupContentsProps {
  title: string;
  currentStep: SignupStep;
  formData: FormData;
  errors: Partial<FormData>;
  onChange: (field: keyof FormData, value: string) => void;
  onValidate: (nextStep: SignupStep) => Promise<void>;
  onStepChange: (step: SignupStep) => void;
  onError: () => void;
  onClose: () => void;
  isButtonDisabled: boolean;
}

interface SignupStepButtonProps {
  currentStep: SignupStep;
  onPrevious: () => void;
  onValidate: (step: SignupStep) => Promise<void>;
  isDisabled: boolean;
}

const SignupStepButton: React.FC<SignupStepButtonProps> = ({ currentStep, onPrevious, onValidate, isDisabled }) => {
  if (currentStep === SignupStep.FIRST) {
    return (
      <Button size={BUTTON_SIZE} onClick={() => onValidate(SignupStep.SECOND)} disabled={isDisabled}>
        다음
      </Button>
    );
  }
  return (
    <div className='signup__button-container'>
      <Button size={BUTTON_SIZE} variant='tertiary' onClick={onPrevious}>
        이전
      </Button>
      <Button size={BUTTON_SIZE} onClick={() => onValidate(SignupStep.SUCCESS)} disabled={isDisabled}>
        가입
      </Button>
    </div>
  );
};

const SignupContents: React.FC<SignupContentsProps> = ({
  title,
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
    currentStep === SignupStep.FIRST ? (
      <SignupFirstStepField formData={formData} onChange={onChange} errors={errors} />
    ) : (
      <SignupSecondStepField formData={formData} onChange={onChange} errors={errors} />
    );

  return (
    <Modal
      modalType={PAGE_MODAL}
      title={title}
      footer={
        <SignupStepButton
          currentStep={currentStep}
          onPrevious={() => onStepChange(SignupStep.FIRST)}
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
          <Stepper steps={steps} activeStep={currentStep === SignupStep.FIRST ? 0 : 1} />
          {content}
        </>
      </form>
    </Modal>
  );
};

export default SignupContents;
