import React from 'react';
import SettingsContentLayout from '@/common/components/settings/layout/SettingsContent';
import { ResetPasswordFields } from '@/common/components/accounts/findPassword/ResetPasswordContent';
import { useUpdatePassword } from '@/common/hooks/settings/useUpdatePassword';
import ProcessErrorModal from '@/common/components/common/feedback/ProcessErrorModal';
import ProcessSuccessModal from '@/common/components/common/feedback/ProcessSuccessModal';
import { UPDATE_PASSWORD_SUCCESS_MESSAGES } from '@/common/constants';

const UpdatePasswordPage: React.FC = () => {
  const { state, handleChange, handleSubmit, handleErrorModal, handleSuccessModal, isButtonDisabled } =
    useUpdatePassword();
  if (state.resetError) {
    return (
      <ProcessErrorModal
        title='비밀번호 재설정 실패'
        content={state.resetErrorMessage && state.resetErrorMessage}
        onClose={handleErrorModal}
      />
    );
  }

  if (state.resetSuccess) {
    return (
      <ProcessSuccessModal title='비밀번호 재설정 성공' onClose={handleSuccessModal}>
        {UPDATE_PASSWORD_SUCCESS_MESSAGES.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </ProcessSuccessModal>
    );
  }

  return (
    <SettingsContentLayout
      title='비밀번호 변경'
      form={<ResetPasswordFields state={state} onChange={handleChange} />}
      isButtonDisabled={isButtonDisabled()}
      onSubmit={handleSubmit}
      buttonText='변경'
    />
  );
};

export default UpdatePasswordPage;
