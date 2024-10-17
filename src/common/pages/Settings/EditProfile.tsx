import React from 'react';
import SettingsContentLayout from '@/common/components/settings/layout/SettingsContent';
import EditProfileForm from '@/common/components/settings/profile/EditProfileForm';

const EditProfileFormPage: React.FC = () => (
  <SettingsContentLayout
    title='프로필 수정'
    form={<EditProfileForm />}
    isButtonDisabled={false}
    onSubmit={() => {}}
    buttonText='수정'
  />
);

export default EditProfileFormPage;
