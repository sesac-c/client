import { useNavigate } from "react-router-dom";
import ProccessErrorModal from "../../components/common/ProccessErrorModal.jsx";
import HeaderedInputText from "../../components/common/UI/HeaderedInputText.jsx";
import Modal from "../../components/common/UI/Modal.jsx";
import { useState } from "react";
import Button from "../../components/common/UI/Button.jsx";
import {REST_PASSWORD_PATH} from '../../constants/paths.js'
import VerificationCodeField from "../../components/accounts/VerificationCodeField.jsx";

const FindPasswordPage = () => {
  const [findPasswordProccessStatus, setFindPasswordProccessStatus] = useState('email');
  const navigate = useNavigate();
  const error = false; //TODO: status error로 수정 필요

  const isSendVerificationCode = findPasswordProccessStatus === 'verificationCode';
  let button;

  // TODO: 실제 로직 구현 필요, 비밀번호 설정 페이지 만들기
  if(findPasswordProccessStatus === 'email') {
    button = <Button size="large" onClick={() => {
      setFindPasswordProccessStatus('verificationCode');
    }}>인증번호 발송</Button>;
  } else {
    button = <Button size="large" onClick={() => {
      navigate(REST_PASSWORD_PATH);
    }}>확인</Button>;
  }

  if (error) {
    return <ProccessErrorModal buttonTo='login' title='비밀번호 찾기 실패' />
  } else {
    return (
      <Modal
        title='비밀번호 찾기'
        modalType='pagemodal'
        showCloseButton={true}
        closeTo='login'
        footer={button}
      >
        <div className="modal-form">
          <HeaderedInputText 
            title='이메일 인증' 
            placeHolder='이메일' 
            name='email' 
            type='email' 
            disabled={isSendVerificationCode} 
            inputMessage = { isSendVerificationCode && '인증코드가 발송되었습니다!'}
            inputMessageType = { isSendVerificationCode && 'success'}
          />
          {
            isSendVerificationCode && <VerificationCodeField />
          }
        </div>
      </Modal>
    )
  }
}

export default FindPasswordPage;