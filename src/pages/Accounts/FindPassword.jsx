import Modal from '../../components/common/UI/Modal.jsx';
import Button from '../../components/common/UI/Button.jsx';
import ProcessErrorModal from '../../components/common/ProcessErrorModal.jsx';
import FindPasswordContent from '../../components/Accounts/FindPasswordContent.jsx';
import useFindPasswordState from '../../hooks/Accounts/useFindPasswordState';
import { useNavigateHandler } from '../../hooks/useNavigateHandler';
import { FIND_PASSWORD_PROCESS_STATUS } from '../../hooks/Accounts/useFindPasswordState';
import { LOGIN_PATH } from '../../constants/routes';
import { PAGE_MODAL } from '../../constants/modal';

const TITLE = '비밀번호 찾기';
const BUTTON_SIZE = 'large';
const BUTTON_TEXT = {
  [FIND_PASSWORD_PROCESS_STATUS.EMAIL]: '인증번호 발송',
  [FIND_PASSWORD_PROCESS_STATUS.CODE]: '확인'
};

const FindPasswordPage = () => {
  const { state, handleButtonClick } = useFindPasswordState();

  if (state.isError) {
    return <ProcessErrorModal title='비밀번호 찾기 실패' onClose={useNavigateHandler(LOGIN_PATH)} />;
  }

  return (
    <Modal
      modalType={PAGE_MODAL}
      title={TITLE}
      footer={
        <Button size={BUTTON_SIZE} onClick={handleButtonClick}>
          {BUTTON_TEXT[state.currentStep]}
        </Button>
      }
      onClose={useNavigateHandler(LOGIN_PATH)}
    >
      <FindPasswordContent currentStep={state.currentStep} />
    </Modal>
  );
};

export default FindPasswordPage;
