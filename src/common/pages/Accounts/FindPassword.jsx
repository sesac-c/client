import { useNavigateHandler } from '../../hooks/useNavigateHandler';
import { useFindPasswordState } from '../../hooks/accounts/useFindPasswordState';

import ProcessErrorModal from '../../components/common/feedback/ProcessErrorModal';
import FindPasswordContent from '../../components/accounts/findPassword/FindPasswordContent';

import { LOGIN_PATH } from '../../constants';

const FindPasswordPage = () => {
  const title = '비밀번호 찾기';
  const { state, handleChange, handleButtonClick, isButtonDisabled } = useFindPasswordState();
  const navigateToLogin = useNavigateHandler(LOGIN_PATH);

  if (state.isError) {
    return <ProcessErrorModal title={`'${title} 실패'`} onClose={navigateToLogin} />;
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
