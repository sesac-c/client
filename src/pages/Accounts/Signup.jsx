import { useSearchParams } from 'react-router-dom';
import Modal from '../../components/common/UI/Modal.jsx';

import {
  SignupFirstStepField,
  SignupSecondStepField,
  SignupCompleteContent,
  SignupFirstStepButton,
  SignupSecondStepButton,
  SignupCompleteButton
} from '../../components/accounts/SignupContents.jsx';
import ProcessErrorModal from '../../components/common/ProcessErrorModal.jsx';
import { useNavigateHandler } from '../../hooks/useNavigateHandler.js';

function getModalContent(step) {
  let title = '회원가입';
  let formContent;
  let buttonContent;
  let modalType;
  let showCloseButton;

  switch (step) {
    case 'second':
      formContent = <SignupSecondStepField />;
      buttonContent = <SignupSecondStepButton />;
      modalType = 'pagemodal';
      showCloseButton = true;
      break;
    case 'complete':
      title += ' 완료';
      formContent = <SignupCompleteContent />;
      buttonContent = <SignupCompleteButton />;
      modalType = 'generalmodal';
      showCloseButton = false;
      break;
    case null:
    case 'first':
    default:
      formContent = <SignupFirstStepField />;
      buttonContent = <SignupFirstStepButton />;
      modalType = 'pagemodal';
      showCloseButton = true;
      break;
  }

  return {
    title,
    formContent,
    buttonContent,
    modalType,
    showCloseButton
  };
}
const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const error = false; //TODO: status error로 수정 필요

  if (error) {
    return <ProcessErrorModal buttonTo='login' title='회원가입 실패' />;
  } else {
    const { title, modalType, showCloseButton, buttonContent, formContent } = getModalContent(step);
    return (
      <Modal
        modalType={modalType}
        title={title}
        footer={buttonContent}
        onClose={showCloseButton && useNavigateHandler('../login')}
      >
        {formContent}
      </Modal>
    );
  }
};

export default SignupPage;
