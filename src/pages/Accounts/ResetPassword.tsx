import React from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { verifyPasswordResetUuid } from '@/services/api';
import { RESET_PASSWORD_SUCCESS_MESSAGES } from '@/constants';
import ProcessErrorModal from '@/components/common/feedback/ProcessErrorModal';
import ProcessSuccessModal from '@/components/common/feedback/ProcessSuccessModal';
import { useResetPassword } from '@/hooks/accounts/useResetPassword';
import { ResetPasswordForm, Header } from '@/components/accounts/findPassword/ResetPasswordContent';

const ResetPasswordPage: React.FC = () => {
  const { uuid } = useLoaderData() as { uuid: string };
  const { state, handleChange, handleSubmit, handleErrorModal, handleSuccessModal, isButtonDisabled } =
    useResetPassword(uuid);
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
        {RESET_PASSWORD_SUCCESS_MESSAGES.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </ProcessSuccessModal>
    );
  }

  return (
    <div id='wrap'>
      <Header />
      <main id='main'>
          <ResetPasswordForm
            state={state}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isButtonDisabled={isButtonDisabled}
          />
      </main>
    </div>
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const uuid = params.uuid;
  try {
    return await verifyPasswordResetUuid(uuid);
  } catch (error) {
    throw error;
  }
};

export default ResetPasswordPage;
