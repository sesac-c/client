import React from 'react';
import SettingsContentLayout from '@/common/components/settings/layout/SettingsContent';
import UpdatePasswordForm from '@/common/components/settings/password/UpdatePasswordForm';

const UpdatePasswordPage: React.FC = () => (
  <SettingsContentLayout
    title='비밀번호 변경'
    form={<UpdatePasswordForm />}
    isButtonDisabled={false}
    onSubmit={() => {}}
    buttonText='변경'
  />
);

export default UpdatePasswordPage;
