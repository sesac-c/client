import React from 'react';
import { useNavigateHandler } from '@/hooks';
import { useFindPasswordState } from '@/hooks/accounts/useFindPasswordState';
import ProcessErrorModal from '@/components/common/feedback/ProcessErrorModal';
import FindPasswordContent from '@/components/accounts/findPassword/FindPasswordContent';
import { LOGIN_PATH } from '@/routes/paths';

const FindPasswordPage: React.FC = () => {
  const title = '비밀번호 찾기';
  const { state, handleChange, handleButtonClick, isButtonDisabled } = useFindPasswordState();
  const navigateToLogin = useNavigateHandler(LOGIN_PATH);

  if (state.isError) {
    return <ProcessErrorModal title={`${title} 실패`} onClose={navigateToLogin} />;
  }

  return (
    <FindPasswordContent
      title={title}
      state={state}
      handleChange={handleChange}
      handleButtonClick={handleButtonClick}
      isButtonDisabled={isButtonDisabled}
    />
  );
};

export default FindPasswordPage;
