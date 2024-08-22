import PropTypes from 'prop-types';

import { useConfirmClose } from '../../../hooks/common/useConfirmClose';
import { useNavigateHandler } from '../../../hooks/common/useNavigateHandler';
import { FIND_PASSWORD_PROCESS_STATUS } from '../../../hooks/accounts/useFindPasswordState';

import Modal from '../../common/UI/Modal.jsx';
import Button from '../../common/UI/Button.jsx';
import Stepper from '../../common/UI/Stepper.jsx';

import EmailInputField from './EmailInputField.jsx';
import VerificationCodeField from './VerificationCodeField.jsx';

import { PAGE_MODAL, LOGIN_PATH, FINDPASSWORD_CONFIRM_MESSAGE } from '../../../constants/index';

// Constants
const steps = ['이메일 인증', '인증번호 인증', '비밀번호 변경'];
const BUTTON_SIZE = 'large';

const FindPasswordContent = ({ state, title, handleChange, handleButtonClick, isButtonDisabled }) => {
  const buttonText = state.isTimerExpired
    ? '인증번호 재전송'
    : state.currentStep === FIND_PASSWORD_PROCESS_STATUS.EMAIL
      ? '인증번호 발송'
      : '확인';
  const confirmClose = useConfirmClose(FINDPASSWORD_CONFIRM_MESSAGE);
  const navigateToLogin = useNavigateHandler(LOGIN_PATH);
  const content = (
    <>
      <Stepper steps={steps} activeStep={state.currentStep === FIND_PASSWORD_PROCESS_STATUS.EMAIL ? 0 : 1} />
      <EmailInputField
        email={state.email}
        isEmailValid={state.isEmailValid}
        helperText={state.emailHelperText}
        onChange={handleChange}
      />
      {state.currentStep === FIND_PASSWORD_PROCESS_STATUS.CODE && (
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

FindPasswordContent.propTypes = {
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.func.isRequired
};

export default FindPasswordContent;
