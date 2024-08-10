import { useNavigate } from 'react-router-dom';
import ProcessErrorModal from '../../components/common/ProcessErrorModal.jsx';
import HeaderedInputText from '../../components/common/UI/HeaderedInputText.jsx';
import Modal from '../../components/common/UI/Modal.jsx';
import { useState } from 'react';
import Button from '../../components/common/UI/Button.jsx';
import { RESET_PASSWORD_PATH } from '../../constants/routes.js';
import VerificationCodeField from '../../components/accounts/VerificationCodeField.jsx';
import { useNavigateHandler } from '../../hooks/useNavigateHandler.js';

const FindPasswordPage = () => {
  const [findPasswordProcessStatus, setFindPasswordProcessStatus] = useState('email');
  const navigate = useNavigate();
  const error = false; //TODO: status error로 수정 필요

  const isSendVerificationCode = findPasswordProcessStatus === 'verificationCode';
  let button;

  // TODO: 실제 로직 구현 필요, 비밀번호 설정 페이지 만들기
  if (findPasswordProcessStatus === 'email') {
    button = (
      <Button
        size='large'
        onClick={() => {
          setFindPasswordProcessStatus('verificationCode');
        }}
      >
        인증번호 발송
      </Button>
    );
  } else {
    button = (
      <Button
        size='large'
        onClick={() => {
          navigate(RESET_PASSWORD_PATH);
        }}
      >
        확인
      </Button>
    );
  }

  if (error) {
    return <ProcessErrorModal buttonTo='login' title='비밀번호 찾기 실패' />;
  } else {
    return (
      <Modal modalType='pagemodal' title='비밀번호 찾기' footer={button} onClose={useNavigateHandler('../login')}>
        <div className='modal-form'>
          <HeaderedInputText
            title='이메일 인증'
            placeholder='이메일'
            name='email'
            type='email'
            disabled={isSendVerificationCode}
            inputMessage={isSendVerificationCode && '인증코드가 발송되었습니다!'}
            inputMessageType={isSendVerificationCode && 'success'}
          />
          {isSendVerificationCode && <VerificationCodeField />}
        </div>
      </Modal>
    );
  }
};

export default FindPasswordPage;
